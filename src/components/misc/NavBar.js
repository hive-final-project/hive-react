import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ImageAvatar from './ImageAvatar';
import FaceIcon from '@material-ui/icons/Face';

import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';
import { pics } from '../../utils/imgProvider';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#6E8C13'  
      },
      secondary: {
        main: '#8ba342'  
      },
      tertiary: {
        main: '#F9B233'
      }
    },
    typography: { useNextVariants: true },
  });

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }, 
  },
  personalized:{
    color: '#F9B233',

  },
  personalizedUser :{
      paddingLeft: theme.spacing.unit* 2,
      color: '#F9B233'
  },
  link:{
    textDecoration: "none",
    color: "black"
  }
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = () => {
    authService.logout()
      .then(() => {
        this.props.onUserChanged({});
      })
    }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const renderMobileMenu = (
    <MuiThemeProvider theme={theme}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >

          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <FaceIcon />
            </IconButton>
            <Link to='/profile' className={classes.link}><p>Profile</p></Link>
          </MenuItem>
        <MenuItem onClick={this.handleLogout}>
            <IconButton color="inherit">
                <AccountCircle />
            </IconButton>
            <p>Logout</p>
        </MenuItem>

      </Menu>
    </MuiThemeProvider>
    );

    return (
      <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar className={classes.personalized} position="fixed">
          <Toolbar component={'span'}>
            <Typography component={'span'} className={classes.personalized} variant="h6" noWrap>
                <Link to='/'><ImageAvatar image={pics.miniLogo} className={classes.avatar}/></Link>
            </Typography>
            <Typography component={'span'} className={classes.personalizedUser} variant="subtitle1" noWrap>
                {this.props.user.name}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleLogout}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        </MuiThemeProvider>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withAuthConsumer(NavBar));
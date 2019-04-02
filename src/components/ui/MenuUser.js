import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'; 
import authService from '../../services/auth-service';
import { UnsubscriptionError } from 'rxjs';
import AlignItemsList from './AlignItemsList';

import { withAuthConsumer } from '../../context/AuthStore';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: (250, 241, 227),
  },
});

class MenuUser extends React.Component {
  state = {
    value: 0,
    user: {orders: []},
    error: ''
  };

  componentDidMount() {
    authService.getUser()
      .then(
          (user) => this.setState({ user: {...user} }),
          (error) => console.error(error)
        )
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  render() {
    const { classes, theme } = this.props;
    console.log('User', this.state.user);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Orders" />
            <Tab label="Producers" />
            <Tab label="New Order" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><AlignItemsList elems={this.state.user.orders} user={this.state.user}/></TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    
    );
  }
}

MenuUser.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withAuthConsumer(MenuUser));
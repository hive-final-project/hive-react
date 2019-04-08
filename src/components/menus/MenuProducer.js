import './prod.css'

import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'; 
import authService from '../../services/auth-service';
import AlignItemsList from '../ui/AlignItemsList';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { withAuthConsumer } from '../../context/AuthStore';
import NewProduct from '../prod/NewProduct';
import TitlebarGridList from '../misc/TitlebarGridList';
import orderService from '../../services/order-service';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6E8C13'  
    },
    secondary: {
      main: '#8ba342'  
    },
  },
  typography: { useNextVariants: true },

});

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
    primary: {
      main: '#6E8C13'  
    },
    secondary: {
      main: '#8ba342'  
    },
  },
});

class MenuProducer extends React.Component {
  state = {
    value: 0,
    user: {products: []},
    orders: [],
    error: ''
  };

  componentDidMount() {
    this.getProducerOrders()
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

  getProducerOrders = () => {
    orderService.listOrders()
    .then(
      (orders) => this.setState({ orders: orders}),
      (error) => console.error(error)
    )
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Orders" />
            <Tab label="Products" />
            <Tab label="New Product" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><AlignItemsList orders={this.state.orders} /></TabContainer>
          <TabContainer dir={theme.direction}><TitlebarGridList products={this.state.user.products} /></TabContainer>
          <TabContainer dir={theme.direction}><NewProduct /></TabContainer>
        </SwipeableViews>
        </MuiThemeProvider>
      </div>
    
    );
  }
}

MenuProducer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withAuthConsumer(MenuProducer));
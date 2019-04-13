

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './guards/PrivateRoute';
import Home from './components/Home';
import Profile from './components/auth/Profile';
import Order from './components/order/Order';
import constants from './constants';
import { StripeProvider } from 'react-stripe-elements';

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey={constants.StripeApiKey}>
      <div className="App">
         <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/order" component={Order} />
          </Switch>
      </div>
      </StripeProvider>
    );
  }
}

export default App;

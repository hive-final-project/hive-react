import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './guards/PrivateRoute';
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
         <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
            </Switch>
      </div>
    );
  }
}

export default App;

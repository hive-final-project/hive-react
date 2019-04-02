
import React, { Component } from 'react'
import { authService } from '../services/index'

const CURRENT_USER_KEY = 'current-user';
const AuthContext = React.createContext();

class AuthStore extends Component {

  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
  }
  userChangeSubscription = {}

  componentDidMount() {
    this.userChangeSubscription = authService.onUserChange()
      .subscribe(user => this.setState({ user: user }));
  }

  componentWillUnmount() {
    this.userChangeSubscription.unsubscribe();
  }

  handleUserChange = (user) => {
    this.setState({ user: user });
    
  }

  isAuthenticated = () => this.state.user && this.state.user.email;
  isAdmin = () => this.state.user && this.state.user.role === 'admin';

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        onUserChanged: this.handleUserChange,
        isAuthenticated: this.isAuthenticated,
        isAdmin: this.isAdmin,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const withAuthConsumer = (Component) => {
  return (props) => (
    <AuthContext.Consumer>
      {(storeProps) => <Component {...props} {...storeProps}/>}
    </AuthContext.Consumer>
  )
}

export { AuthContext, AuthStore, withAuthConsumer }
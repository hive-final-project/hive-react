import React, { Component } from 'react';

const AuthContext = React.createContext();
const CURRENT_USER_KEY = 'current-user'

class AuthStore extends Component {
    state = {
        user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
    }

    handleUserChange = (user) => {
        this.setState({ user });
        if(user && user.email){
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }
        else localStorage.removeItem(CURRENT_USER_KEY);
    }

    isAdmin = () => {
        return this.state.user.role === "admin";
    }

    isAuthenticated = () => {
        return !!this.state.user.email;
    }

    render(){
        return(
            <AuthContext.Provider value={{ 
                user: this.state.user, 
                onUserChanged: this.handleUserChange,
                isAdmin : this.isAdmin(),
                isAuthenticated: this.isAuthenticated()
            }}>
            { this.props.children }
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

export { AuthContext, AuthStore, withAuthConsumer };
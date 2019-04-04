import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import authService from '../../services/auth-service';
import LoginForm from '../ui/LoginForm';
import { withAuthConsumer } from '../../context/AuthStore';


const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/i;
const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/;


const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!emailRegEx.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Password is required';
    } else if (!passRegEx.test(value)) {
      message = 'You should use uppercase, lowercase, numbers and special characters.'
    return message;
  	}
	}
}	

class Login extends Component {

	state = {
    user: {
      email: '',
      password: ''
    },
    errors: {
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user)
        .then(
          (user) => this.setState({ isAuthenticated: true }, () => {
            this.props.onUserChanged(user);
          }),
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...errors,
                password: !errors && message
              },
              touch: {
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  isValid = () => {
    return !Object.keys(this.state.user)
      .some(attr => this.state.errors[attr])
  }

  render () {
		const { isAuthenticated, errors, user, touch } = this.state;
		if (isAuthenticated) {
      return (<Redirect to="/" />)
    }

    return (
      <LoginForm 
      email={user.email} 
      password={user.password} 
      touch={touch} 
      errors={errors}
      handleChange={this.handleChange}
      handleBlur={this.handleBlur}
      handleSubmit={this.handleSubmit}
      isValid={this.isValid}/>
  )}
}




export default withAuthConsumer(Login);
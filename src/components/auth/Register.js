import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';
import RegisterForm from '../ui/RegisterForm';


const emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/i;
const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/;


const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'Name is required';
    }
    return message;
  },
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

class Register extends Component {

	state = {
    user: {
      email: '',
      password: '',
      name: '',
      role: '',
      attachment: '',
      location: {
        coordinates: [0,0] },
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isRegistered: false
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
      authService.register(this.state.user)
        .then(
          (user) => this.setState({ isRegistered: true }),
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
		const { isRegistered, errors, user, touch } = this.state;
		
		if (isRegistered) {
      return (<Redirect to="/login" />)
    }

    return (
      <RegisterForm 
        name={user.name} 
        email={user.email} 
        password={user.password} 
        role={user.role} 
        touch={touch} 
        errors={errors}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        handleSubmit={this.handleSubmit}
        isValid={this.isValid}
        />
  )}
};

export default withAuthConsumer(Register);
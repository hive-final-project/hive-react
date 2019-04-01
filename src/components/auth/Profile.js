import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';

import ProfileForm from '../ui/ProfileForm';


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



class Profile extends Component {

	state = {
    user: {
      email: '',
      password: '',
      name: '',
      role: '',
      attachment: '',
      location: {
        coordinates: [0,0] },
      imageURL: '',
      category:'',
      deliverDay:'',
      otherInfo:''
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password(),
    },
    touch: {},
    isRegistered: false
  }

  componentDidMount() {
    authService.getUser()
      .then(
          (user) => this.setState({ user: {...this.state.user, ...user} }),
          (error) => console.error(error)
        )
  }

  handleChange = (event) => {
    const { name, value, files } = event.target;
    console.log('Files', files[0].name)
    this.setState({
      user: {
        ...this.state.user,
        [name]: files && files[0] ? files[0] : name
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  isProducer = () => this.state.producer ==='PRODUCER';

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
      authService.editUser(this.state.user)
      .then(
        (user) => this.setState({ user: {...this.state.user, ...user} }),
        (error) => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              email: !errors && message
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
        <ProfileForm 
        name={user.name} 
        email={user.email} 
        password={user.password} 
        category={user.category}
        deliverDay={user.deliverDay}
        imageURL={user.imageURL}
        attachment={user.attachment}
        touch={touch} 
        errors={errors}
        handleChange={this.handleChange}
        handleBlur={this.handleBlur}
        handleSubmit={this.handleSubmit}
        isValid={this.isValid}
        isProducer={this.isProducer}
        />
  )}
}




export default (withAuthConsumer(Profile));
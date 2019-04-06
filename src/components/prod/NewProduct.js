import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';

import NewProductForm from '../ui/NewProductForm';
import { productService } from '../../services';



class NewProduct extends Component {

	state = {
    product: {
      user: this.props.user.name,
      name: '',
      attachment: '',
      imageURL: '',
      category:'',
      price: 0,
      amount: '',
      description:'',
      active: true,
      errors: {
        name: true
      },
      touch: {},
    },
    saved: false
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
    this.setState({
      product: {
        ...this.state.product,
        [name]: (files && files[0]) ? files[0].name : value
      },
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
      productService.newProduct(this.state.product)
      .then(
        (product) => this.setState({ product: {...this.state.product, ...product}, saved: true }),
        (error) => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              email: !errors && message
            }
          })
        })
    }

  render () {
        const { product } = this.state;
        if (this.state.saved) { return <Redirect to='/' />}

    return (
        <NewProductForm 
        category={product.category}
        attachment={product.attachment}
        price={product.price}
        amount={product.amount}
        description={product.description}
        active={product.active}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        />
  )}
}




export default (withAuthConsumer(NewProduct));
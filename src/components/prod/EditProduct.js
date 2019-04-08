import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../context/AuthStore';

import EditProductForm from '../ui/EditProductForm';
import { productService } from '../../services';
import MediaCard from './MediaCard';



class EditProduct extends Component {

	state = {
    product: {
      user: this.props.user.name,
      name: '',
      attachment: '',
      imageURL: '',
      category:'',
      price: '',
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
    console.log('PROPS PRODUCT',this.props.product)
    this.setState({ product: this.props.product })
  }

  handleChange = (event) => {
    const { name, value} = event.target;
    this.setState({
      product: {
        ...this.state.product,
        [name]: value
      },
    })
  }

  handleFile = event => {
    const { files } = event.target;
    this.setState({
      product: {
        ...this.state.product,
        attachment: files[0]
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
    const { product,saved } = this.state;

    if (saved) {
    return (<MediaCard product={product}/>)
    }

    return (
        <EditProductForm
        name={product.name}
        category={product.category}
        attachment={product.attachment}
        price={product.price}
        amount={product.amount}
        description={product.description}
        active={product.active}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleFile={this.handleFile}
        />
  )}
}




export default (withAuthConsumer(EditProduct));
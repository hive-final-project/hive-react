import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import productService from '../../services/product-service';
import ProductItemOrder from './ProductItemOrder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class OrderItemsList extends Component  { 
  state = {
    products: [],
  }

  componentDidMount(){
    const start = async () => {
      let newProducts = [];
      await asyncForEach( this.props.order.products, async(product) => {
        const eachProduct = await productService.getProduct(product.product)
        newProducts.push({ product:eachProduct, units: product.units })
      })
      return newProducts;
    }

    start()
    .then(products => {this.setState({ products: products})})
  }

  render (){
  const { classes } = this.props;
  const { price } = this.props.order;
  const products = () => this.state.products.map(product => <ProductItemOrder key={product.id} product={product} classes={classes} price={price}/>)
  return (
      <List className={classes.root}>
        {products()}
      </List>
  );
}
}

OrderItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderItemsList);
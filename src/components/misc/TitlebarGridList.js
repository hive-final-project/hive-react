import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import ListSubheader from '@material-ui/core/ListSubheader';
import SearchBar from './SearchBar'; 
import Product from '../prod/Product';
import { withAuthConsumer } from '../../context/AuthStore';
import Button from '@material-ui/core/Button';
import Order from '../order/Order';
import { Typography } from '@material-ui/core';

import { orderService } from '../../services';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 450,
    height: 450,
  },
  icon: {
    color: '#F9B233',
  }
});

class TitlebarGridList extends Component {

  state={
    products: [],
    singleProd: '',
    search: '',
    order: {
      user: this.props.user,
      products: [],
      price: 0
    },
    preview: false
  }

  componentDidUpdate(prevProps) {
    if(prevProps.products !== this.props.products && this.props.products.length) {
      console.info('HAY PRODUCTS => ', this.props.products.length)
      this.setState({ products: this.props.products })
    }
  }

  onChangeSearch = event => this.setState({ search: event.target.value })

  onFilter = () => 
    this.state.products.filter(prod => prod.name.toLowerCase().includes(this.state.search.toLowerCase()));

  handleClick = id => {
    this.setState({ singleProd: id })
  } 

  goBack = () => {
    this.setState({ singleProd: ''})
  }
  
  addToCart = (product, price, units) => {
    const total = this.state.order.price + (price * units)
    this.setState({ order: { products: [...this.state.order.products, {product, units}] , price: total}})
  }

  previewOrder = (order) => {
    orderService.newOrder(order)
      .then(
        (response) => { this.setState({ preview: true, order: response })},
        (error) => console.error(error)
      )
  }

  isProducer = () => {
    return this.props.user.role === 'PRODUCER'
  }

  render(){
  const { classes, category } = this.props;
 
  if (this.state.singleProd){ 
    return (<Product product={this.state.singleProd} goBack={this.goBack} addToCart={this.addToCart}/>)
  }
  if (this.state.preview){
    return (<Order order={this.state.order} goBack={this.goBack} />)
  }

  const filterProductsByCategory = (category) => this.onFilter().filter(prod => prod.category === category).map(product =>(
    <GridListTile cols={2} className={classes.tile} key={product.id}>
            <img src={product.imageURL} alt={product.name} />
            <GridListTileBar
            title={product.name}
            subtitle={<span>price: {product.price} €</span>}
            actionIcon={
              <Chip 
                className={classes.icon}
                value={product.id}
                onClick={() => this.handleClick(product.id)}
                color="secondary"
                variant="outlined"
                label="Info"
                icon={<InfoIcon />}>
              </Chip>
            }
            />
            </GridListTile>
  ));

  return (
    <div className={classes.root}>
      <SearchBar onChangeSearch={this.onChangeSearch}/>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"> { category }</ListSubheader>
        </GridListTile>
        {this.onFilter().filter(prod => prod.category === 'veggie').length &&
          <Typography variant="h6" style={{height: '30px', color:"#6E8C13"}}>
          Fruits and vegs:
          </Typography>}
          {filterProductsByCategory('veggie')}
          {this.onFilter().filter(prod => prod.category === 'milky').length &&
          <Typography variant="h6" style={{height: '30px', color:"#6E8C13"}}>
          Milk products:
          </Typography>}
          {filterProductsByCategory('milky')}
          {this.onFilter().filter(prod => prod.category === 'poultry').length &&
          <Typography variant="h6" style={{height: '30px', color:"#6E8C13"}}>
          Poultry products:
          </Typography>}
          {filterProductsByCategory('poultry')}
          {this.onFilter().filter(prod => prod.category === 'apiculture').length &&
          <Typography variant="h6" style={{height: '30px', color:"#6E8C13"}}>
          Apiculture:
          </Typography>}
          {filterProductsByCategory('apiculture')}
          {this.onFilter().filter(prod => prod.category === 'butcher').length &&
          <Typography variant="h6" style={{height: '30px', color:"#6E8C13"}}>
          Butcher products:
          </Typography>}
          {filterProductsByCategory('butcher')}
      </GridList>
      { !this.isProducer() &&
      <Button variant="contained" color="primary" fullWidth onClick={() =>this.previewOrder(this.state.order)}>
          Preview order
      </Button>}
    </div>
  );
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withAuthConsumer(TitlebarGridList));
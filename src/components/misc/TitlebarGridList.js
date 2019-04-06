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


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 450,
    height: 450,
  },
  // icon: {
  //   color: 'rgba(255, 255, 255, 0.54)',
  // },
  // tile:{
  //   width: '100%'
  // },
  
});

class TitlebarGridList extends Component {

  state={
    products: [],
    singleProd: ''
  }

  componentDidMount() {
    this.setState({ products: this.props.products })
  }

  onFilter = (search) => {
    const newProducts = this.props.products.filter(prod => prod.name.toLowerCase().includes(search.toLowerCase()));
    this.setState({ products: newProducts});
  }

  handleClick = (product) => {
    this.setState({ singleProd: product })
  } 

  render(){
  const { classes, products, category } = this.props;
  console.log(this.state.singleProd);
  if (this.state.singleProd){ 
    return (<Product product={this.state.singleProd}/>)
  }

  return (
    <div className={classes.root}>
      <SearchBar onFiler={this.onFilter}/>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"> { category }</ListSubheader>
        </GridListTile>
        {products && products.map(product =>(
            <GridListTile cols={2} className={classes.tile} key={product.id}>
            <img src={product.imageURL} alt={product.name} />
            <GridListTileBar
            title={product.name}
            subtitle={<span>price: {product.price} €</span>}
            actionIcon={
              <Chip 
                className={classes.icon}
                onClick={this.handleClick(product.id)}
                icon={<InfoIcon />}>
              </Chip>
            }
            />
            </GridListTile>
        ))}
      </GridList>
    </div>
  );
          }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
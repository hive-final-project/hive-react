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


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#6E8C13'
		},
		secondary: {
			main: '#F9B233'
		}
	},
	typography: { useNextVariants: true }
});

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
      price: 0,
      served: false
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.products !== this.props.products) {
      this.setState({ products: this.props.products }, () => console.info(this.state.products))
    }
  }

  onChangeSearch = event => this.setState({ search: event.target.value })

  onFilter = () => 
    this.state.products.filter(prod => prod.name.toLowerCase().includes(this.state.search.toLowerCase()));

  handleClick = id => {

    this.setState({ singleProd: id })
  } 

  handleSubmit = (event) => {

  }

  categoryFilter = (category) => {
  }

  render(){
  const { classes, products, category } = this.props;

  if (this.state.singleProd){ 
    return (<Product product={this.state.singleProd}/>)
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={this.handleSubmit}>
      <SearchBar onChangeSearch={this.onChangeSearch}/>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"> { category }</ListSubheader>
        </GridListTile>
        {products && this.onFilter().map(product =>(
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
        ))}
      </GridList>
      </form>
    </div>
  );
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withAuthConsumer(TitlebarGridList));
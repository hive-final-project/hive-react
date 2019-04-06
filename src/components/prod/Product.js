import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import { productService } from '../../services';
import { withAuthConsumer } from '../../context/AuthStore';
import NewProduct from './NewProduct';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

});

class Product extends React.Component {
  state = { 
      expanded: false,
      product: {},
      edit: false
    };

  componentDidMount(){
      this.productInfo()
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  productInfo = () => {
    productService.getProduct(this.props.product)
    .then( 
        (product) => {
          this.setState({ product: product })
        },
        (error) => console.error(error)
      )
  };

  isProducer = () => {
      return this.props.user.role == 'PRODUCER';
  };

  handleClick = () => {
      this.setState({ edit: true })
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;
    console.log('product', product)
    if ( this.state.edit ){
        return (<NewProduct />)
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          title={product.name}
          subheader={product.description}
        />
        <CardMedia
          className={classes.media}
          image={product.imageURL}
          title={product.name}
        />
        <CardContent>
          <Typography component="p">
            {product.description}
          </Typography>
        </CardContent>
        {this.isProducer() && 
            <Button size="small" color="primary" onClick={this.handleClick()}>
             Edit
            </Button>
    }
      </Card>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withAuthConsumer(Product));
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
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';

import { productService } from '../../services';
import { withAuthConsumer } from '../../context/AuthStore';
import EditProduct from './EditProduct';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';

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
  avatar: {
    backgroundColor: red[500],
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit *2 ,
    width: 100,
  },
  button: {
    float: "right",
    margin: "auto"
  }
});

class Product extends React.Component {
  state = { 
      expanded: false,
      product: {},
      edit: false,
      units: ''
    };

  componentDidMount(){
      this.setState({ edit: false })
      this.productInfo()
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  productInfo = () => {
    productService.getProduct(this.props.product)
    .then( 
        (product) => {
          this.setState({ product }, () => console.info('PRODUCT => ', this.state.product))
        },
        (error) => console.error(error)
      )
  };

  isProducer = () => {
      return this.props.user.role === 'PRODUCER';
  };

  handleClick = () => {
      this.setState({ edit: true })
  }

  handleDelete = () => {
    productService.deleteProduct(this.state.product.id)
    .then(
      (message) => {this.setState({ product: {} })},
      (error) => console.error(error)
    )
  }

  goBack = () => {
    this.setState({ edit: false })
  }

  handleActivate = () => {
    if (this.state.product.active){
      this.setState({product : { active: false}})
    } else this.setState({product: { active: true }})
  };

  handleChange = (event) => {
    this.setState({ units: event.target.value })
  }

  render() {
    const { classes, goBack, addToCart } = this.props;
    const { product } = this.state;

    if ( this.state.edit ){
        return (<EditProduct product={product} goBack={this.goBack}/>)
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
 
        <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
        </IconButton>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>  
        <CardMedia
          className={classes.media}
          image={product.user && product.user.imageURL}
          title={product.user && product.user.name}
        />
          <CardContent>
            <Typography component="p">
              {product.user && product.user.name}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography component="p">
              {product.user && product.user.otherInfo}
            </Typography>
          </CardContent>
        </Collapse>
        {this.isProducer() && 
            <Button size="small" color="primary" onClick={this.handleClick}>
             Edit
            </Button>
        }
        {this.isProducer() && 
            <Button size="small" color="primary" onClick={this.handleDelete}>
              <DeleteIcon />
            </Button>
        }
        {this.isProducer() && product.active &&
            <Button size="small" color="primary" onClick={this.handleActivate}>
             Deactivate
            </Button>
        }
        {this.isProducer() && !product.active &&
            <Button size="small" color="primary" onClick={this.handleActivate}>
             Activate
            </Button>
        }
        {!this.isProducer() && 
          <TextField
          id="standard-number"
          label="Units"
          value={this.state.units}
          onChange={this.handleChange}
          type="number"
          className={classes.textField}
        />
        }
        {!this.isProducer() && 
          <Button className={classes.bigButton} variant="contained" color="primary" onClick={() => addToCart(product.id, this.state.units)}>
                Add to cart
          </Button>
        }
        <Button className={classes.button} size="small" color="primary" onClick={goBack}>
            Back
        </Button>
      </Card>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withAuthConsumer(Product));
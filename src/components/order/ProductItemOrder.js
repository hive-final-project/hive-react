import React from 'react';

import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ProductItemOrder = (props) => {
    const { product, classes } = props;
    return(
    <ListItem key={product.product.id} alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={product.product.name} src={product.product.imageURL} />
        </ListItemAvatar>
        <ListItemText
        primary={product.product.name}
        secondary={
        <React.Fragment>
        <Typography component="span" className={classes.inline} color="textPrimary">
           Units: {product.units}
        </Typography>
        <br></br>
            Price: {product.product.price} €
        </React.Fragment>
        }
        />
    </ListItem>);
}

ProductItemOrder.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default ProductItemOrder;

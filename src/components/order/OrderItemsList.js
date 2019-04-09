import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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

function OrderItemsList(props) {
  
  const { classes, order } = props;
  const products = () => order.products.map( product => (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={product.product.name} src={product.product.imageURL} />
        </ListItemAvatar>
        <ListItemText
          primary={product.product.name}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {product.units}
              </Typography>
              {product.product.price}
            </React.Fragment>
          }
        />
      </ListItem>
  ))
  return (
    <List className={classes.root}>
      {products()}
    </List>
  );
}

OrderItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderItemsList);
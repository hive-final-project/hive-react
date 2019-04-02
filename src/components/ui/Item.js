import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const Item = (props) => {
    const { classes, order, user } = props;
    console.info('ORDER => ', order)
    const orderProducts = () => order && order.products.map(prod => <Typography component="span" className={classes.inline} color="textPrimary">{prod}</Typography>)
    return ( 
    <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={user.name} src={user.imageURL} />
    </ListItemAvatar>
    <ListItemText
      primary={order.user}
      secondary={
        <React.Fragment>
            {orderProducts()}
          {order.timestamps}
        </React.Fragment>
      }
    />
  </ListItem>);
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Item;
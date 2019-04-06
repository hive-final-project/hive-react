import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'


const Item = (props) => {
    const { classes, orders } = props;
    const orderProducts = () => orders && orders.map(ord => 
    <List key={ord.id} className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="product" className={classes.bigAvatar} src="https://source.unsplash.com/random/?vegetables" />
        </ListItemAvatar>
        <ListItemText
          primary={moment(ord.updatedAt).format('YYYY-MM-DD')}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                status: {ord.served}
              </Typography>
                 - Order id: {ord.id}
          </React.Fragment>
          }
        />
      </ListItem>
    </List>
    );
      
      return (
        <React.Fragment>
          {orderProducts()}
        </React.Fragment> 
  )

}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Item;
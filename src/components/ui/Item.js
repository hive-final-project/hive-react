import React from 'react';
import PropTypes from 'prop-types';
import ItemOrder from './ItemOrder';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const Item = (props) => {
    const { classes, orders } = props;

    const orderProductsServed = () => orders && orders.filter(ord => ord.served === 'Delivered').map(ord => <ItemOrder key={ord.id} classes={classes} order={ ord }/>);  
    const orderProductsToServe = () => orders && orders.filter(ord => ord.served !== 'Delivered').map(ord => <ItemOrder key={ord.id} classes={classes} order={ ord }/>);
    return (
        <React.Fragment>
          <Typography variant="h6" style={{color:"#6E8C13"}}>
          Orders to serve:
          </Typography>
          <Divider variant="middle" />
          {orderProductsToServe()}
          <Divider variant="middle" />
          <Typography variant="h6" style={{color:"#6E8C13"}}>
          Orders served:
          </Typography>
          <Divider variant="middle" />
          {orderProductsServed()}
        </React.Fragment> 
  )

}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Item;
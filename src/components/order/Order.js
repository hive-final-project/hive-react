import React from 'react';
import NavBar from '../misc/NavBar';
import OrderItemsLIst from './OrderItemsList';

const Order = (props) => {
    return(
        <OrderItemsLIst order={props.order}/>
        
    );
}

export default Order;
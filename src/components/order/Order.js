import React, { Component } from 'react';
import OrderItemsLIst from './OrderItemsList';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fragment from '@material-ui/core/FormHelperText';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from '../payments/CheckoutForm';

class Order extends Component{
    state={
        payed: false,
        order: this.props.order
    }

    sendOrder = () => {
        const newOrder = this.props.order;
        newOrder.served= 'Payed';
        this.setState({payed: true, order: newOrder})
    }

    render(){
    const { order } = this.props;
    console.log(this.state.order)
    if(this.state.payed){
        return (
            <Elements>
                <CheckoutForm order={this.state.order}/>
            </Elements>
        )
    }
    return(
        <Fragment>
            <Typography gutterBottom variant="h6" component="h2" style={{ color:'#6E8C13' }}>
                Order Details:
            </Typography>
            <OrderItemsLIst order={order}/> 
            <Typography gutterBottom variant="h6" component="h2" style={{ color:'#6E8C13' }}>
                Total: { order.price } €
            </Typography>
            <Button variant="contained" color="primary" onClick={() => this.sendOrder()}>
                Pay order
            </Button>
        </Fragment>
           
    );
    }
}

export default Order;
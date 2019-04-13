import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ButtonSuccess from '../misc/ButtonSuccess';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';

import { withAuthConsumer } from '../../context/AuthStore';
import orderService from '../../services/order-service';


class ItemOrder extends Component {

    state={
        order: {},
        details: false
    }

    componentDidMount(){
        this.setState({order: this.props.order})
    }

    serveOrder = () => {
        const newOrder = this.state.order;
        newOrder.served = 'Delivered';
        orderService.editOrder( newOrder.id, newOrder)
        .then(
            (response) => this.setState({ order: response }),
            (error) => console.error(error)
        )

    }

    isProducer = () => {
        return this.props.user.role === 'PRODUCER'
    }

    seeDetails = () => {
        this.setState({ details: true})
    }

    render(){
        const { classes } = this.props;
        const { order} = this.state;
        return(
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                {this.isProducer() && (
                    <ListItemAvatar>
                        <ButtonSuccess onClick={this.serveOrder} orderStatus={ Object.keys(order).length && order.served }/>
                    </ListItemAvatar>
                )}
                {!this.isProducer() && (
                    <IconButton aria-label="Cart">
                        <ShoppingCartIcon />
                    </IconButton>
                )}
                <ListItemText
                    primary={moment(order.updatedAt).format('DD-MM-YYYY')}
                    secondary={
                    <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                            status: {order.served}
                        </Typography>
                        <br />
                        id: {order.id}
                    </React.Fragment>
                    }
                />
            </ListItem>
        </List>
        );
    }
}

ItemOrder.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withAuthConsumer(ItemOrder);
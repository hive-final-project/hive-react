import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { orderService } from '../../services';
import Typography from '@material-ui/core/Typography';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  // async submit(ev) {
    // console.log(this.props.order)
    // orderService.editOrder(this.props.order.id, this.props.order)
    // .then(
    //   (response) => this.props.goBack(),
    //   (error) => console.error(error)
    // )
  async submit(ev) {
    let response = await orderService.editOrder(this.props.order.id, this.props.order)
    
    if (response) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) {
      return <Typography gutterBottom variant="h6" component="h2" style={{ color:'#6E8C13' }}>
        Purchase Completed
        </Typography>;
      }

    return (
      <div className="checkout">
        <Typography gutterBottom variant="h6" component="h2" style={{ color:'#6E8C13' }}>
        Would you like to complete the purchase?
        </Typography>
            <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

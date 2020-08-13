import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from './actions';

class Payments extends Component {
    render()
    {
      return (
          <StripeCheckout
              name="E- Survey"
              description="Payment for Survey Credits"
              amount={500}
              currency="INR"
              stripeKey={process.env.REACT_APP_STRIPE_KEY} 
              token={token => this.props.handleToken(token)} >
              <button className="btn">Add credits</button>
          </StripeCheckout>
          );
        }
    }

export default connect(null, actions)(Payments);
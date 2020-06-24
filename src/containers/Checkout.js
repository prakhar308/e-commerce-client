import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AddressForm from '../containers/AddressForm'
import OrderSummary from '../components/OrderSummary'
import { fetchCart } from '../actions/';
import withAuthenticate from '../HOC/withAuthenticate'

class Checkout extends Component {
   componentDidMount() {
      this.props.fetchCart();
   }

   render() {
      const { cart } = this.props;
      const purchased = this.props.order.purchased;
      return (
         <div>
            { purchased ? <Redirect to="/order-confirmed" /> : null }
            <h1>Shipping</h1>
            <AddressForm />
            <OrderSummary cart={cart}/>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cart: state.cart,
   order: state.order,
})

const mapDispatchToProps = dispatch => ({
   fetchCart: () => dispatch(fetchCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuthenticate(Checkout));

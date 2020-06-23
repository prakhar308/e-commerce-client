import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressForm from '../containers/AddressForm'
import OrderSummary from '../components/OrderSummary'

const Checkout = (props) => {
   return (
      <div>
         <h1>Shipping</h1>
         <AddressForm />
         <OrderSummary cart={props.cart}/>
      </div>
   )
}

const mapStateToProps = state => ({
   cart: state.cart,
})

export default connect(mapStateToProps)(Checkout);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressForm from '../containers/AddressForm'
import OrderSummary from '../components/OrderSummary'
import { fetchCart } from '../actions/';

class Checkout extends Component {
   componentDidMount() {
      this.props.fetchCart();
   }

   render() {
      const { cart } = this.props;
      return (
         <div>
            <h1>Shipping</h1>
            <AddressForm />
            <OrderSummary cart={cart}/>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cart: state.cart,
})

const mapDispatchToProps = dispatch => ({
   fetchCart: () => dispatch(fetchCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

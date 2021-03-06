import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AddressForm from '../../containers/AddressForm'
import OrderSummary from '../../components/OrderSummary'
import { fetchCartIfNeeded } from '../../actions/';
import withAuthenticate from '../../HOC/withAuthenticate'
import Loader from '../../components/Loader/Loader'
import classes from './Checkout.module.css'

class Checkout extends Component {
   componentDidMount() {
      this.props.fetchCartIfNeeded();
   }

   render() {
      const { cart } = this.props;
      const { purchased, loading } = this.props.order;
      return (
         <div>
            <h1>Shipping</h1>
            { loading ? <Loader /> : null}
            <div className={classes.Checkout}>
               { purchased ? <Redirect to="/order-confirmed" /> : null }
               <AddressForm />
               <OrderSummary cart={cart}/>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cart: state.cart,
   order: state.order,
})

const mapDispatchToProps = dispatch => ({
   fetchCartIfNeeded: () => dispatch(fetchCartIfNeeded()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuthenticate(Checkout));

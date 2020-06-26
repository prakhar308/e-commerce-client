import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './HomePage';
import Cart from '../containers/Cart'
import { tryAutoSignin } from  '../actions/'
import Navbar from '../containers/Navbar/Navbar' 
import AuthForm from '../containers/AuthForm'
import Checkout from '../containers/Checkout'
import OrderConfirmed from '../containers/OrderConfirmed'

class App extends Component {
   componentDidMount() {
      this.props.tryAutoSignin();
   }
   render() {
      return (
         <div>
            <Navbar />
            <Switch>
               <Route path="/order-confirmed" component={OrderConfirmed} />
               <Route path="/checkout" component={Checkout} />
               <Route path="/login" component={AuthForm} />
               <Route path="/cart" component={Cart} />
               <Route path="/" component={HomePage} />
            </Switch>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   tryAutoSignin: () => dispatch(tryAutoSignin())
})

export default connect(null, mapDispatchToProps)(App);
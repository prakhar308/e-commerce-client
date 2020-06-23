import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './HomePage';
import Cart from '../containers/Cart'
import { tryAutoSignin } from  '../actions/'
import Navbar from '../containers/Navbar' 
import AuthForm from '../containers/AuthForm'

class App extends Component {
   componentDidMount() {
      this.props.tryAutoSignin();
   }
   render() {
      return (
         <div>
            <Navbar />
            <Switch>
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
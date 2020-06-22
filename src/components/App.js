import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './HomePage';
import Cart from '../containers/Cart'
import { tryAutoSignin } from  '../actions/'
import Navbar from '../containers/Navbar' 

class App extends Component {
   componentDidMount() {
      this.props.tryAutoSignin();
   }
   render() {
      return (
         <div>
            <Navbar />
            <Switch>
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
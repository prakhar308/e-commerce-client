import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import HomePage from './HomePage';
import Cart from '../containers/Cart'
import { tryAutoSignin } from  '../actions/'

class App extends Component {
   componentDidMount() {
      this.props.tryAutoSignin();
   }
   render() {
      return (
         <div>
            <Link to="/">Home</Link>
            {' '}
            <Link to="/cart">Cart</Link>
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
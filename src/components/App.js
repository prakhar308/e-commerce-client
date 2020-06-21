import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

import HomePage from './HomePage';
import Cart from '../containers/Cart'

const App = (props) => {
   return (
      <div>
         <Link to="/" exact>Home</Link>
         {' '}
         <Link to="/cart">Cart</Link>
         <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/" component={HomePage} />
         </Switch>
      </div>
   )
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';

const App = (props) => {
   return (
      <Switch>
         <Route path="/" component={HomePage} />
      </Switch>
   )
}

export default App;

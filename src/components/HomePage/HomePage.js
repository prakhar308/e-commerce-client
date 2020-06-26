import React from 'react';
import Products from '../../containers/Products/Products';
import ProductFilters from '../../containers/ProductFilters/ProductFilters';

import classes from './HomePage.module.css'

const HomePage = (props) => {
   return (
      <div className={classes.HomePage}>
         <ProductFilters />
         <Products />
      </div>
   )
}

export default HomePage;

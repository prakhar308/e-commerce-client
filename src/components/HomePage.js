import React from 'react';
import Products from '../containers/Products';
import ProductFilters from '../containers/ProductFilters';

const HomePage = (props) => {
   return (
      <div>
         <ProductFilters />
         <Products />
      </div>
   )
}

export default HomePage;

import React from 'react';
import FilteredProducts from '../containers/FilteredProducts';
import ProductFilters from '../containers/ProductFilters';

const HomePage = (props) => {
   return (
      <div>
         <ProductFilters />
         <FilteredProducts />
      </div>
   )
}

export default HomePage;

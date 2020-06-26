import React from 'react';

import classes from '../containers/ProductFilters/ProductFilters.module.css'

const Filter = ({ filter, active, onClick }) => {
   return (
      <button 
         className={active ? classes.activeFilter : null}
         onClick={onClick}>
         {filter}
      </button>
   )
}

export default Filter;
   
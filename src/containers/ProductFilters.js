import React from 'react';
import { connect } from 'react-redux';
import Filter from '../components/Filter';
import FilterTypes from '../constants/FilterTypes';
import { setProductFilter } from '../actions/'

const ProductFilters = ({ onFilterChange }) => {
   return (
      <div>
         {Object.keys(FilterTypes).map((filter) => 
            <Filter key={FilterTypes[filter]} 
               filter={FilterTypes[filter]}
               onClick={() => onFilterChange(FilterTypes[filter])}/>
         )}
      </div>
   )
}

const mapDispatchToProps = dispatch => ({
   onFilterChange: (filter) => dispatch(setProductFilter(filter))
})

export default connect(null, mapDispatchToProps)(ProductFilters);

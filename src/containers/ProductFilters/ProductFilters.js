import React from 'react';
import { connect } from 'react-redux';
import Filter from '../../components/Filter';
import FilterTypes from '../../constants/FilterTypes';
import { setProductFilter } from '../../actions/'

import classes from './ProductFilters.module.css';

const ProductFilters = ({ currentFilter, onFilterChange }) => {
   return (
      <div className={classes.filters}>
         {Object.keys(FilterTypes).map((filter) => 
            <Filter key={FilterTypes[filter]} 
               filter={FilterTypes[filter]}
               active={FilterTypes[filter] === currentFilter}
               onClick={() => onFilterChange(FilterTypes[filter])}/>
         )}
      </div>
   )
}

const mapStateToProps = state => ({
   currentFilter: state.productFilter
})

const mapDispatchToProps = dispatch => ({
   onFilterChange: (filter) => dispatch(setProductFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilters);

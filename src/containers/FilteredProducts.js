import React, { Component } from 'react';

import { connect } from 'react-redux';
import Products from '../components/Products';
import { fetchProducts } from '../actions/'
import { getFilteredProducts } from '../reducers/'

class FilteredProducts extends Component {
   componentDidMount() {
      this.props.dispatch(fetchProducts());   
   }

   render() {
      let products = <div>Loading...</div>

      if(this.props.products.length){
         products = <Products products={this.props.products} />
      }
      return (
         products
      )
   }
}

const mapStateToProps = state => ({
   products: getFilteredProducts(state, state.productFilter)
})

export default connect(mapStateToProps)(FilteredProducts);
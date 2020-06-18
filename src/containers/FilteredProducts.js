import React, { Component } from 'react';

import { connect } from 'react-redux';
import Products from '../components/Products';
import { fetchProducts } from '../actions/'

class FilteredProducts extends Component {
   componentDidMount() {
      this.props.dispatch(fetchProducts());   
   }

   render() {
      return (
         <Products products={this.props.products} />
      )
   }
}

const mapStateToProps = state => ({
   products: state.products
})

export default connect(mapStateToProps)(FilteredProducts);
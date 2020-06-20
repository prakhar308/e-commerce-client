import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts, addToCart, updateCart} from '../actions/'
import { getFilteredProducts, getProductQuantity } from '../reducers/'
import Product from '../components/Product'

class Products extends Component {
   componentDidMount() {
      this.props.fetchProducts();
   }

   render() {
      let products = <div>Loading...</div>

      if(this.props.products.length){
         products = this.props.products.map((prod) => (
            <Product
               key={prod._id}
               {...prod}
               cartQty={this.props.getProductQuantity(prod._id)}
               onAddToCart={() => this.props.onAddToCart(prod._id, 1)}
               onUpdateCart={(e) => this.props.onUpdateCart(prod._id, e)}
            />
         ))
      }
      return (
         products
      )
   }
}

const mapStateToProps = state => ({
   products: getFilteredProducts(state, state.productFilter),
   getProductQuantity: (e) => getProductQuantity(state, e)
})

const mapDispatchToProps = dispatch => ({
   fetchProducts: () => dispatch(fetchProducts()),
   onAddToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   onUpdateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts, addToCart, updateCart, removeFromCart, fetchCart } from '../actions/'
import { getFilteredProducts, getProductQuantity } from '../reducers/'
import Product from '../components/Product'

class Products extends Component {
   componentDidMount() {
      this.props.fetchCart();
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
               onAddToCart={() => this.props.addToCart(prod._id, 1)}
               onUpdateCart={(e) => this.props.updateCart(prod._id, e)}
               onRemoveCart={() => this.props.removeFromCart(prod._id)}
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
   addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   updateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
   removeFromCart: (productId) => dispatch(removeFromCart(productId)),
   fetchCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);

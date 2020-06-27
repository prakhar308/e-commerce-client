import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
   fetchProducts,
   addToCart,
   updateCart,
   removeFromCart,
   fetchCartIfNeeded,
   removeError,
} from '../../actions/'
import { getFilteredProducts, getProductQuantity } from '../../reducers/'
import Product from '../../components/Product/Product'
import classes from './Products.module.css'
import Loader from '../../components/Loader/Loader'

class Products extends Component {
   componentDidMount() {
      this.props.fetchProducts();
      if (this.props.isAuthenticated) {
         this.props.fetchCartIfNeeded();
      }
      this.props.removeError();
   }

   render() {
      let error = this.props.error;
      let products = <Loader />

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
         <div>
            {error ? <div className={classes.error}>{error}</div> : null}
            <div className={classes.Products}>
               {products}
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.user.isAuthenticated,
   products: getFilteredProducts(state, state.productFilter),
   getProductQuantity: (e) => getProductQuantity(state, e),
   error: state.error.message,
})

const mapDispatchToProps = dispatch => ({
   fetchProducts: () => dispatch(fetchProducts()),
   addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   updateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
   removeFromCart: (productId) => dispatch(removeFromCart(productId)),
   fetchCartIfNeeded: () => dispatch(fetchCartIfNeeded()),
   removeError: () => dispatch(removeError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);

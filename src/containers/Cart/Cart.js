import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import classes from './Cart.module.css' 

import CartItem from '../../components/CartItem/CartItem';
import {
   initPurchase,
   fetchCartIfNeeded,
   addToCart,
   updateCart,
   removeFromCart,
   clearCart 
} from '../../actions/'

import Loader from '../../components/Loader/Loader'

class Cart extends Component {
   componentDidMount() {
      if (this.props.isAuthenticated) {
         this.props.fetchCartIfNeeded();
      }
      this.props.initPurchase();
   }

   render() {
      const { cartItems, loading, error, totalPrice } = this.props 

      const isEmpty = cartItems.length === 0
      const cart = (
         cartItems.map((item) => (
            <CartItem
               key={item._id}
               {...item}
               onAddToCart={() => this.props.addToCart(item._id, 1)}
               onUpdateCart={(e) => this.props.updateCart(item._id, e)}
               onRemoveCart={() => this.props.removeFromCart(item._id)}
            />
         ))
      )

      return (
         <div className={classes.Cart}>
            
            <div className={classes.CartDetails}>
               <h3>You have {cartItems.length}
               {cartItems.length === 1 ? ' item' : ' items'} in cart</h3>
               <button
                  disabled={cartItems.length === 0 ? true: false}
                  onClick={this.props.clearCart}>
                  Clear Shopping Cart
               </button>
            </div>

            <div className={classes.CartHeading}>
               <h2></h2>
               <h2>Product</h2>
               <h2>Quantity</h2>
               <h2>Price</h2>
            </div>

            {
               isEmpty
                  ? (loading ? <Loader />: <h1>Wow so empty</h1>)
                  : cart
            }

            <div className={classes.TotalPrice}>
               <h3>Total price: <strong>{totalPrice}</strong></h3>
            </div>

            <div className={classes.Checkout}>
               {
                  cartItems.length === 0
                  ? <span>Checkout</span>
                  : <button><Link to="/checkout">Checkout</Link></button>
               }
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.user.isAuthenticated,
   cartItems: state.cart.cart || [],
   loading: state.cart.loading,
   error: state.cart.error,
   totalPrice: state.cart.totalPrice,
})

const mapDispatchToProps = dispatch => ({
   initPurchase: () => dispatch(initPurchase()),
   fetchCartIfNeeded: () => dispatch(fetchCartIfNeeded()),
   addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   updateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
   removeFromCart: (productId) => dispatch(removeFromCart(productId)),
   clearCart: () => dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

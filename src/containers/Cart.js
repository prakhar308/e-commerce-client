import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import CartItem from '../components/CartItem';
import {
   initPurchase,
   fetchCart,
   addToCart,
   updateCart,
   removeFromCart,
   clearCart 
} from '../actions/'

class Cart extends Component {
   componentDidMount() {
      this.props.fetchCart();
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
         <div>
            <p>You have {cartItems.length}
               {cartItems.length === 1 ? ' item' : ' items'} in cart
            </p>
            <button
               disabled={cartItems.length === 0 ? true: false}
               onClick={this.props.clearCart}>
               Clear Shopping Cart
            </button>
            {
               isEmpty
                  ? (loading ? <h1>Loading...</h1> : <h1>Wow so empty</h1>)
                  : cart
            }
            <p>Total price: <strong>{totalPrice}</strong></p>
            <Link to="/checkout">Checkout</Link>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cartItems: state.cart.cart,
   loading: state.cart.loading,
   error: state.cart.error,
   totalPrice: state.cart.totalPrice,
})

const mapDispatchToProps = dispatch => ({
   initPurchase: () => dispatch(initPurchase()),
   fetchCart: () => dispatch(fetchCart()),
   addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   updateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
   removeFromCart: (productId) => dispatch(removeFromCart(productId)),
   clearCart: () => dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

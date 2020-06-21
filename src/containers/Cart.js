import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItem from '../components/CartItem';
import { fetchCart, addToCart, updateCart, removeFromCart } from '../actions/'

class Cart extends Component {
   componentDidMount() {
      this.props.fetchCart();
   }

   render() {
      const { cartItems, loading, error } = this.props 

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
            {
               isEmpty
                  ? (loading ? <h1>Loading...</h1> : <h1>Wow so empty</h1>)
                  : cart
            }
         </div>
      )
   }
}

const mapStateToProps = state => ({
   cartItems: state.cart.cart,
   loading: state.cart.loading,
   error: state.cart.error,
})

const mapDispatchToProps = dispatch => ({
   fetchCart: () => dispatch(fetchCart()),
   addToCart: (productId, qty) => dispatch(addToCart(productId, qty)),
   updateCart: (productId, qty) => dispatch(updateCart(productId, qty)),
   removeFromCart: (productId) => dispatch(removeFromCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
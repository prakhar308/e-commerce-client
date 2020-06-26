import React from 'react';

import classes from '../containers/Checkout/Checkout.module.css'

const OrderSummary = (props) => {
   const { cart, totalPrice } = props.cart;
   return (
      <div className={classes.OrderSummar}>
         <h2>Order Summary</h2>
         <p>You have {cart.length} items in your cart.</p>
         {
            cart.map((cartItem) => (
               <div key={cartItem._id} className={classes.CartItem}>
                  <div>{cartItem.qty}{' '}x{' '}{cartItem.name}</div>
                  <div>${cartItem.price}</div>
               </div>
            ))
         }
         <div className={classes.CartItem}>
            <div>Total</div>
            <div>${totalPrice}</div>
         </div>
      </div>
   )
}

export default OrderSummary;

import React from 'react';
import { connect } from 'react-redux';

const OrderSummary = (props) => {
   const { cart, totalPrice } = props.cart;
   return (
      <div>
         <h2>Order Summary</h2>
         <p>You have {cart.length} items in your cart.</p>
         {
            cart.map((cartItem) => (
               <div
                  key={cartItem._id}>
                  {cartItem.qty}{' '}x{' '}{cartItem.name}{' '}${cartItem.price}
               </div>
            ))
         }
         <p><strong>Total {totalPrice}</strong></p>
      </div>
   )
}

export default OrderSummary;

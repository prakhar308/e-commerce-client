import React from 'react';

import classes from './CartOperationsButton.module.css'

const CartOperationsButton = ({
   qty,
   onAddToCart,
   onUpdateCart,
   onRemoveCart
}) => {
   
   let update;
   if(qty === 1)
      update = () => onRemoveCart()
   else
      update = () => onUpdateCart(qty-1);

   return (
      qty === 0
         ? <button
               onClick={onAddToCart}>Add To Cart</button>
         : <div className={classes.CartOperationsButton}>
               <button onClick={update}>-</button>
               <button>{qty} in Cart</button>
               <button onClick={() => onUpdateCart(qty+1)}>+</button>
           </div>
   )
}

export default CartOperationsButton;

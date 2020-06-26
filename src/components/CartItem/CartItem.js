import React from 'react';
import CartOperationsButton from '../CartOperationsButton/CartOperationsButton';
import classes from './CartItem.module.css'

const CartItem = ({
   img,
   name,
   qty,
   price,
   onAddToCart,
   onUpdateCart,
   onRemoveCart,
}) => {
   return (
      <div className={classes.CartItem}>
         <div>
            <img src={img}></img>
         </div>      
         <div>
            <h4>{name}</h4>
         </div>
         <div>
            <CartOperationsButton
               qty={qty}
               onAddToCart={onAddToCart}
               onUpdateCart={onUpdateCart}
               onRemoveCart={onRemoveCart}/>
         </div>
         <div>
            <h4>{price}</h4>
         </div>
      </div>      
   )
}

export default CartItem;

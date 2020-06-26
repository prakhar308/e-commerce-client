import React from 'react';
import CartOperationsButton from './CartOperationsButton/CartOperationsButton';

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
      <div>
         <img src={img}></img>
         <h2>{name}</h2>
         <h3>{price}</h3>
         <CartOperationsButton
            qty={qty}
            onAddToCart={onAddToCart}
            onUpdateCart={onUpdateCart}
            onRemoveCart={onRemoveCart}/>
         <hr/>
      </div>      
   )
}

export default CartItem;

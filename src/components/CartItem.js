import React from 'react';
import CartOperationsButton from './CartOperationsButton';

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
         <h3>{name}</h3>
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

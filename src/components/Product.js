import React from 'react';
import CartOperationsButton from './CartOperationsButton'

const Product = ({
   name,
   price,
   img,
   description,
   cartQty,
   onAddToCart,
   onUpdateCart,
   onRemoveCart
}) => {
   return (
      <div>
         <img src={img} alt="product_image"/>
         <h3>{name}</h3>
         <h4>{price}</h4>
         <p>{description}</p>
         <CartOperationsButton 
            qty={cartQty}
            onAddToCart={onAddToCart}
            onUpdateCart={onUpdateCart}
            onRemoveCart={onRemoveCart}/>  
         <hr/>
      </div>
   )
}

export default Product;

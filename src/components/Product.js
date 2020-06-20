import React from 'react';

const Product = ({
   name,
   price,
   img,
   description,
   cartQty,
   onAddToCart,
   onUpdateCart
}) => {
   return (
      <div>
         <img src={img} alt="product_image"/>
         <h3>{name}</h3>
         <h4>{price}</h4>
         <p>{description}</p>
         {
            cartQty === 0
               ? <button
                     onClick={onAddToCart}>Add To Cart</button>
               : <div>
                     <button onClick={() => onUpdateCart(cartQty-1)}>-</button>
                     <button>{cartQty}</button>
                     <button onClick={() => onUpdateCart(cartQty+1)}>+</button>
                 </div>
         }
         <hr/>
      </div>
   )
}

export default Product;

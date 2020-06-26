import React from 'react';
import CartOperationsButton from '../CartOperationsButton/CartOperationsButton'
import classes from './Product.module.css'

const Product = ({
   name,
   price,
   img,
   description,
   cartQty,
   onAddToCart,
   onUpdateCart,
   onRemoveCart,
}) => {
   return (
      <div className={classes.Product}>
         <img src={img} alt="product_image"/>
         <h2>{name}</h2>
         <h3>{price}</h3>
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

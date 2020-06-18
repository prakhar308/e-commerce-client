import React from 'react';

const Product = ({
   name,
   price,
   img,
   description
}) => {
   return (
      <div>
         <img src={img} alt="product_image"/>
         <h3>{name}</h3>
         <h4>{price}</h4>
         <p>{description}</p>
      </div>
   )
}

export default Product;

import React from 'react';
import Product from './Product';

const Products = ({ products }) => {
   return (
      <div>
         {products.map((product) => 
            <Product 
               key={product._id}
               {...product}
            />
         )}
      </div>
   )
}

export default Products;

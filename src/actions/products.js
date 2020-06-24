import axios from 'axios';
import {
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_FAILURE,
} from '../constants/ActionTypes'

export const fetchProductsSuccess = (products) => ({
   type: FETCH_PRODUCTS_SUCCESS,
   products
})

export const fetchProductsFailure = (error) => ({
   type: FETCH_PRODUCTS_FAILURE,
   error
})

export const fetchProducts = () => {
   return async function (dispatch) {
      try {
         let products = await axios.get("/api/products");
         if(!products) {
            throw new Error("Cannot fetch products")
         }
         dispatch(fetchProductsSuccess(products.data))
      } catch(e) {
         console.log(e)
         dispatch(fetchProductsFailure(e))
      }
   }
}

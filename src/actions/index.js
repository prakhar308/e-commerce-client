import axios from 'axios';
import {
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_FAILURE,
   SET_PRODUCT_FILTER,
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   CART_OPERATION_FAIL,
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

export const setProductFilter = (filter) => ({
   type: SET_PRODUCT_FILTER,
   filter
})

export const startCartOperation = () => ({
   type: START_CART_OPERATION
})

export const addToCartSuccess = (product) => ({
   type: ADD_TO_CART_SUCCESS,
   product
})

export const cartOperationFail = error => ({
   type: CART_OPERATION_FAIL,
   error
})

export const addToCart = (productId, qty) => {
   return async function(dispatch) {
      try {
         dispatch(startCartOperation())
         let product = await axios.post("/api/cart/add",{productId, qty});
         dispatch(addToCartSuccess(product.data))
      } catch (e) {
         dispatch(cartOperationFail(e.message))
      } 
   }
}





import axios from 'axios'
import {
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   CART_OPERATION_FAIL,
   UPDATE_CART_SUCCESS,
   REMOVE_CART_SUCCESS,
   FETCH_CART_SUCCESS,
   CLEAR_CART_SUCCESS,
} from '../constants/ActionTypes'

export const startCartOperation = () => ({
   type: START_CART_OPERATION
})

export const addToCartSuccess = (product) => ({
   type: ADD_TO_CART_SUCCESS,
   product
})

export const updateCartSuccess = (productId, qty) => ({
   type: UPDATE_CART_SUCCESS,
   productId,
   qty 
})

export const removeCartSuccess = (productId) => ({
   type: REMOVE_CART_SUCCESS,
   productId
})

export const fetchCartSuccess = (cart) => ({
   type: FETCH_CART_SUCCESS,
   cart
})

export const clearCartSuccess = () => ({
   type: CLEAR_CART_SUCCESS
})

export const cartOperationFail = error => ({
   type: CART_OPERATION_FAIL,
   error
})

export const addToCart = (productId, qty) => {
   return async function(dispatch) {
      try {
         // set loading to true
         dispatch(startCartOperation())
         // send api request
         let product = await axios.post("/api/cart/add",{productId, qty});
         // add product to cart in redux store
         dispatch(addToCartSuccess(product.data))
      } catch (e) {
         // set error
         dispatch(cartOperationFail(e.message))
      } 
   }
}

export const updateCart = (productId, qty) => {
   return async function(dispatch) {
      try {
         // set loading to true
         dispatch(startCartOperation())
         // send api request to update cart
         await axios.put("/api/cart/update", {productId, qty})
         // update qty of product inside the cart of the redux store
         dispatch(updateCartSuccess(productId, qty))
      } catch (e) {
         // set error
         dispatch(cartOperationFail(e.message))
      }
   }
}

export const removeFromCart = (productId) => {
   return async function (dispatch) {
      try {
         // set loading to true
         dispatch(startCartOperation())
         // send api request to remove the product
         // from cart using it's id
         await axios.put("/api/cart/remove", { productId })
         // now remove product from redux cart
         dispatch(removeCartSuccess(productId)) 
      } catch (e) {
         // set error
         dispatch(cartOperationFail(e.message))
      }
   }
}

export const fetchCart = () => {
   return async function (dispatch) {
      try {
         // set loading to true
         dispatch(startCartOperation())
         // send api request to get all cart items
         const cart = await axios.get("/api/cart");
         // set cart in redux store
         dispatch(fetchCartSuccess(cart.data))
      } catch (e) {
         dispatch(cartOperationFail(e.message))
      }
   }
}

export const clearCart = () => {
   return async function (dispatch) {
      try {
         // set loading to true
         dispatch(startCartOperation())
         // send api request to clear the cart
         await axios.get("/api/cart/clear");
         // update cart in redux store
         dispatch(clearCartSuccess());
      } catch (e) {
         dispatch(cartOperationFail(e.message))
      }
   }
}

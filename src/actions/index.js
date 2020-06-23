import axios from 'axios';
import {
   FETCH_PRODUCTS_SUCCESS,
   FETCH_PRODUCTS_FAILURE,
   SET_PRODUCT_FILTER,
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   CART_OPERATION_FAIL,
   UPDATE_CART_SUCCESS,
   REMOVE_CART_SUCCESS,
   FETCH_CART_SUCCESS,
   CLEAR_CART_SUCCESS,
   START_AUTH,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
} from '../constants/ActionTypes'

import { setAuthorizationHeader } from '../services/api'

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

// ===============================
// AUTH ACTIONS

export const startAuth = () => ({
   type: START_AUTH,
})

export const authSuccess = (user) => ({
   type: AUTH_SUCCESS,
   user,
})

export const authFail = (error) => ({
   type: AUTH_FAIL,
   error
})

export const logout = () => {
   // remove token from header
   setAuthorizationHeader(false);
   // remove token and user details from localStorage
   localStorage.clear();
   return {
      type: AUTH_LOGOUT
   }
}

export const auth = (email, password, isLogin, name) => {
   return async function (dispatch) {
      try {
         // set loading to true
         dispatch(startAuth());
         
         let url = "/api/users/login"
         let data = { email, password }
         // check if login or signup
         // if not login then
         if (!isLogin) {
            url = "/api/users"
            data = {...data, name }
         }
         
         // send api request for authentication 
         let user = await axios.post(url, data);
         
         const { token, ...userDetails } = user.data;
         // store name, email, token in localStorage
         localStorage.setItem("name", userDetails.user.name)
         localStorage.setItem("email", userDetails.user.email);
         localStorage.setItem("jwtToken", token);

         // also save name and email in redux store and
         // set isAuthenticated to true by dispatching authSuccess
         dispatch(authSuccess({
            name: userDetails.user.name,
            email: userDetails.user.email,
         }))

         // set Authorization header for further requests
         setAuthorizationHeader(token)
      } catch (e) {
         dispatch(authFail(e.response.data.error))
      }
   }
}

export const tryAutoSignin = () => {
   return function (dispatch) {
      const token = localStorage.getItem('jwtToken');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      if (token) {
         // set token in Authorization header so that it can be used
         // for sending further requests
         setAuthorizationHeader(token)
         dispatch(authSuccess({name, email}))         
      }
   }
}
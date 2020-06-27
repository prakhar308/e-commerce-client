import axios from 'axios';
import {
   START_AUTH,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT_SUCCESS,
} from '../constants/ActionTypes'

import { setAuthorizationHeader } from '../services/api'
import { clearCartSuccess, fetchCartIfNeeded } from './cart'

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

export const authLogoutSuccess = () => ({
   type: AUTH_LOGOUT_SUCCESS,
})

export const logout = () => {
   return async function (dispatch) {
      try {
         // send api request to logout the user.
         // this will delete the token from db
         // beacause we are also storing the token in db
         await axios.get("/api/users/logout");
         // remove token from header
         setAuthorizationHeader(false);
         // remove token and user details from localStorage
         localStorage.clear();
         // update user details in store
         dispatch(authLogoutSuccess());
         // clear cart
         dispatch(clearCartSuccess());
      } catch (e) {

      }
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

         // set Authorization header for further requests
         setAuthorizationHeader(token)

         // also save name and email in redux store and
         // set isAuthenticated to true by dispatching authSuccess
         dispatch(authSuccess({
            name: userDetails.user.name,
            email: userDetails.user.email,
         }))
      } catch (e) {
         dispatch(authFail(e.response.data.error))
      }
   }
}

export const tryAutoSignin = () => {
   return async function (dispatch) {
      const token = localStorage.getItem('jwtToken');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      if (token) {
         // set token in Authorization header so that it can be used
         // for sending further requests
         setAuthorizationHeader(token)
         dispatch(authSuccess({name, email}))
         // also fetch cart
         await dispatch(fetchCartIfNeeded());
      }
   }
}
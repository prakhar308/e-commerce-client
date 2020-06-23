import axios from 'axios';
import {
   START_AUTH,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
} from '../constants/ActionTypes'

import { setAuthorizationHeader } from '../services/api'

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
import {
   START_AUTH,
   AUTH_SUCCESS,
   AUTH_FAIL,
   AUTH_LOGOUT,
} from '../constants/ActionTypes'

const initialState = {
   loading: false,
   name: null,
   email: null,
   isAuthenticated: false,
   error: null,
}

const startAuth = (state, action) => ({
   ...state,
   loading: true,
})

const authSuccess = (state, action) => ({
   ...state,
   name: action.user.name,
   email: action.user.email,
   isAuthenticated: true,
   loading: false,
})

const authFail = (state, action) => ({
   ...state,
   error: action.error,
   loading: false,
})

const authLogout = (state, action) => ({
   ...state,
   name: null,
   email: null,
   isAuthenticated: false
})

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_AUTH: return startAuth(state, action);
      case AUTH_SUCCESS: return authSuccess(state, action);
      case AUTH_FAIL: return authFail(state, action);
      case AUTH_LOGOUT: return authLogout(state, action);
      default: return state
   }
}

export default authReducer;
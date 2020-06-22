import {
   START_AUTH,
   AUTH_SUCCESS,
   AUTH_FAIL,
} from '../constants/ActionTypes'

const initialState = {
   loading: false,
   user: {},
   error: null,
   isAuthenticated: false,
}

const startAuth = (state, action) => ({
   ...state,
   loading: true,
})

const authSuccess = (state, action) => ({
   ...state,
   user: action.user,
   isAuthenticated: true,
   loading: false,
})

const authFail = (state, action) => ({
   ...state,
   error: action.error,
   loading: false,
})

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_AUTH: return startAuth(state, action);
      case AUTH_SUCCESS: return authSuccess(state, action);
      case AUTH_FAIL: return authFail(state, action);
      default: return state
   }
}

export default authReducer;
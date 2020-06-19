import {
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   CART_OPERATION_FAIL
} from '../constants/ActionTypes'

const initialState = {
   cart: [],
   loading: false,
   error: null
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_CART_OPERATION:
         return {
            ...state,
            loading: true
         }
      case ADD_TO_CART_SUCCESS:
         return {
            ...state,
            cart: [...state.cart, action.product],
            loading: false
         }
      case CART_OPERATION_FAIL:
         return {
            ...state,
            error: action.error
         }
      default:
         return state;
   }
}


export default cartReducer;
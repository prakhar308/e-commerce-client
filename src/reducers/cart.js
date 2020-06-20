import {
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   UPDATE_CART_SUCCESS,
   REMOVE_CART_SUCCESS,
   CART_OPERATION_FAIL,
   FETCH_CART_SUCCESS,
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
      case FETCH_CART_SUCCESS:
         return {
            ...state,
            cart: action.cart
         }
      case ADD_TO_CART_SUCCESS:
         return {
            ...state,
            cart: [...state.cart, action.product],
            loading: false
         }
      case UPDATE_CART_SUCCESS:
         return {
            ...state,
            cart: state.cart.map((product) => (
               product._id === action.productId
               ? {...product, qty: action.qty}
               : product
            ))
         }
      case REMOVE_CART_SUCCESS:
         return {
            ...state,
            cart: state.cart.filter(product => (
               product._id !== action.productId
            ))
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
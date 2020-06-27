import {
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   UPDATE_CART_SUCCESS,
   REMOVE_CART_SUCCESS,
   CART_OPERATION_FAIL,
   FETCH_CART_SUCCESS,
   CLEAR_CART_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
   cart: null,
   totalPrice: 0,
   loading: false,
   error: null
}

const startCartOperation = (state, action) => ({
   ...state,
   loading: true
})

const fetchCart = (state, action) => ({
   ...state,
   cart: action.cart,
   loading: false,
   totalPrice: calculateTotalPrice(state, action),
})

const addToCart = (state, action) => ({
   ...state,
   cart: [...state.cart, action.product],
   loading: false,
   totalPrice: calculateTotalPrice(state, action)
})

const updateCart = (state, action) => ({
   ...state,
   cart: state.cart.map((product) => (
      product._id === action.productId
      ? {...product, qty: action.qty}
      : product
   )),
   loading: false,
   totalPrice: calculateTotalPrice(state, action)
})

const removeCart = (state, action) => ({
   ...state,
   cart: state.cart.filter(product => (
      product._id !== action.productId
   )),
   loading: false,
   totalPrice: calculateTotalPrice(state, action)
})

const clearCart = (state, action) => ({
   ...state,
   cart: null,
   loading: false,
   totalPrice: 0
})

const cartOperationFail = (state, action) => ({
   ...state,
   error: action.error,
   loading: false
})

// calculate total price of cart depending upon the action performed
const calculateTotalPrice = (state, action) => {
   switch (action.type) {
      
      case FETCH_CART_SUCCESS:
         return action.cart.reduce((total, item) => (
            total + item.price * item.qty 
         ), 0)

      case ADD_TO_CART_SUCCESS:
         return state.totalPrice + action.product.price * action.product.qty
      
      case UPDATE_CART_SUCCESS:
         return state.cart.reduce((total, item) => {
            if(item._id === action.productId){
               return total + action.qty * item.price
            } else {
               return total + item.qty * item.price
            }
         }, 0)

      case REMOVE_CART_SUCCESS:
         return state.cart.reduce((total, item) => {
            if(item._id !== action.productId)
               return total + item.price * item.qty
            else
               return total
         }, 0)
      
      default:
         return 0;
   }
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_CART_OPERATION: return startCartOperation(state, action)
      case FETCH_CART_SUCCESS: return fetchCart(state, action)
      case ADD_TO_CART_SUCCESS: return addToCart(state, action)
      case UPDATE_CART_SUCCESS: return updateCart(state, action) 
      case REMOVE_CART_SUCCESS: return removeCart(state, action)
      case CLEAR_CART_SUCCESS: return clearCart(state, action)
      case CART_OPERATION_FAIL: return cartOperationFail(state, action)
      default: return state;
   }
}

export const getProductQuantity = (state, productId) => {
   if (state){
      const foundProduct = state.find((prod) => prod._id === productId)
      
      if(foundProduct)
         return foundProduct.qty;
      else
         return 0;
   } else {
      return 0;
   }
}

export default cartReducer;
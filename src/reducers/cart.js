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
   cart: [],
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
   loading: false
})

const addToCart = (state, action) => ({
   ...state,
   cart: [...state.cart, action.product],
   loading: false
})

const updateCart = (state, action) => ({
   ...state,
   cart: state.cart.map((product) => (
      product._id === action.productId
      ? {...product, qty: action.qty}
      : product
   )),
   loading: false
})

const removeCart = (state, action) => ({
   ...state,
   cart: state.cart.filter(product => (
      product._id !== action.productId
   )),
   loading: false
})

const clearCart = (state, action) => ({
   ...state,
   cart: [],
   loading: false
})

const cartOperationFail = (state, action) => ({
   ...state,
   error: action.error,
   loading: false
})

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
   const foundProduct = state.find((prod) => prod._id === productId)
   
   if(foundProduct)
      return foundProduct.qty;
   else
      return 0;
}

export default cartReducer;
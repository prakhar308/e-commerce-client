import {
   START_CART_OPERATION,
   ADD_TO_CART_SUCCESS,
   UPDATE_CART_SUCCESS,
   REMOVE_CART_SUCCESS,
   CART_OPERATION_FAIL,
   FETCH_CART_SUCCESS,
} from '../constants/ActionTypes'

const initialState = {
   cart: {},
   loading: false,
   error: null
}

const fetchCart = (state, action) => {
   const { cart } = action

   // convert array of objects of cart items to
   // nested objects where every cart item is stored by its id
   // [{_id, qty, ...}, {_id, qty, ...}] => {_id: {qty, ...}, _id: {qty, ...}}
   const transformedCart = cart.reduce((cartById, item) => {
      let { _id, ...itemDetails } = item
      cartById[_id] = itemDetails
      return cartById
   }, {})

   return {
      ...state,
      cart: transformedCart
   }
}

const addToCart = (state, action) => {
   const { product } = action
   const { _id, img, name, qty, price } = product;

   // create new cart item
   const cartItem = { img, name, qty, price } 

   // insert the new cart item into the cart object
   return {
      ...state,
      [_id]: cartItem
   }
}

const updateCart = (state, action) => {
   const { productId, qty } = action

   return {
      ...state,
      cart: {
         ...state.cart,
         [productId]: {
            ...state.cart[productId],
            qty
         }
      } 
   }
}

const removeFromCart = (state, action) => {
   const { productId } = action
   const { cart } = state
   const { [productId]: value, ...remaining } = cart; 

   return {
      ...state,
      cart: remaining
   }
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_CART_OPERATION:
         return {
            ...state,
            loading: true
         }
      case FETCH_CART_SUCCESS:
         return { ...fetchCart(state, action), loading: false }
      case ADD_TO_CART_SUCCESS:
         return { ...addToCart(state, action), loading: false }
      case UPDATE_CART_SUCCESS:
         return { ...updateCart(state, action), loading: false }
      case REMOVE_CART_SUCCESS:
         return {...removeFromCart(state, action), loading: false}
      case CART_OPERATION_FAIL:
         return {
            ...state,
            error: action.error,
            loading: false
         }
      default:
         return state;
   }
}


export default cartReducer;
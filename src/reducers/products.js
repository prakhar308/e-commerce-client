import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../constants/ActionTypes'

const initialState = {
   products: [],
   error: false
} 

const products = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
         return {
            ...state,
            products: action.products
         }
      case FETCH_PRODUCTS_FAILURE:
         return {
            ...state,
            error: true
         }
      default:
         return state;
   }
}

export default products;
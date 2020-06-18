import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../constants/ActionTypes'
import FilterTypes from '../constants/FilterTypes'

const initialState = {
   products: [],
   error: false
} 

const productReducer = (state = initialState, action) => {
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

export default productReducer;

export const getFilteredProducts = (state, filter) => {
   if(filter === FilterTypes.ALL_CATEGORIES) {
      return state;
   } else {
      return state.filter((product) => (
         product.category === filter
      ))
   }
}
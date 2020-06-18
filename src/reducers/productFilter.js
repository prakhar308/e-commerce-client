import FilterTypes from '../constants/FilterTypes';
import { SET_PRODUCT_FILTER } from '../constants/ActionTypes'

const productFilterReducer = (state = FilterTypes.ALL_CATEGORIES, action) => {
   switch (action.type) {
      case SET_PRODUCT_FILTER:
         return action.filter
      default:
         return state;
   }
}

export default productFilterReducer;
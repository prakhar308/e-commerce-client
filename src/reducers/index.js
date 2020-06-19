import { combineReducers } from 'redux';
import productReducer, * as fromProducts from './products';
import productFilterReducer from './productFilter';
import cartReducer from './cart'

export default combineReducers({
   products: productReducer,
   productFilter: productFilterReducer,
   cart: cartReducer
})

export const getFilteredProducts = (state, filter) => {
   return fromProducts.getFilteredProducts(state.products.products, filter)
}
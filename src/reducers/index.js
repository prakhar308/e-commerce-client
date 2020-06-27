import { combineReducers } from 'redux';
import productReducer, * as fromProducts from './products';
import productFilterReducer from './productFilter';
import cartReducer, * as fromCart from './cart'
import authReducer from './auth'
import orderReducer from './order'
import errorReducer from './error'

export default combineReducers({
   products: productReducer,
   productFilter: productFilterReducer,
   cart: cartReducer,
   user: authReducer,
   order: orderReducer,
   error: errorReducer,
})

export const getFilteredProducts = (state, filter) => {
   return fromProducts.getFilteredProducts(state.products.products, filter)
}

export const getProductQuantity = (state, productId) => {
   return fromCart.getProductQuantity(state.cart.cart, productId);
}
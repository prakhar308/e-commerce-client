import axios from 'axios';
import {
   PLACE_ORDER_START,
   PLACE_ORDER_SUCCESS,
   PLACE_ORDER_FAIL,
} from '../constants/ActionTypes'

export const placeOrderStart = () => ({
   type: PLACE_ORDER_START
})

export const placeOrderSuccess = () => ({
   type: PLACE_ORDER_SUCCESS
})

export const placeOrderFail = () => ({
   type: PLACE_ORDER_FAIL
})

export const placeOrder = (address, cart) => {
   return async function (dispatch) {
      try {
         // craete order object to be sent
         const order = {
            products: cart.cart,
            total_bill: cart.totalPrice,
            address
         }
         // set loading to true
         dispatch(placeOrderStart())
         // send api request to place the order
         await axios.post("/api/orders", order)
         // 
         dispatch(placeOrderSuccess())
      } catch (e) {
         dispatch(placeOrderFail());
      }
   }
}
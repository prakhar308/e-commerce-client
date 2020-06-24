import axios from 'axios';
import {
   PLACE_ORDER_START,
   PLACE_ORDER_SUCCESS,
   PLACE_ORDER_FAIL,
   INIT_PURCHASE,
} from '../constants/ActionTypes'

// set purchased field in order state to false
export const initPurchase = () => ({
   type: INIT_PURCHASE,
})

export const placeOrderStart = () => ({
   type: PLACE_ORDER_START
})

export const placeOrderSuccess = (placedOrder) => ({
   type: PLACE_ORDER_SUCCESS,
   placedOrder
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
         const placedOrder = await axios.post("/api/orders", order)
         // 
         dispatch(placeOrderSuccess(placedOrder.data))
      } catch (e) {
         dispatch(placeOrderFail());
      }
   }
}
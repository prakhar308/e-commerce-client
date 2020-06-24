import {
   PLACE_ORDER_START,
   PLACE_ORDER_SUCCESS,
   PLACE_ORDER_FAIL,
} from '../constants/ActionTypes'

const initialState = {
   loading: false,
   orders: [],
   purchased: false
}

const placeOrderStart = (state, action) => ({
   ...state,
   loading: true,
})

const placeOrderSuccess = (state, action) => ({
   ...state,
   loading: false,
   purchased: true,
})

const placeOrderFail = (state, action) => ({
   ...state,
   loading: false,
})

const orderReducer = (state = initialState, action) => {
   switch (action.type) {
      case PLACE_ORDER_START: return placeOrderStart(state, action)
      case PLACE_ORDER_SUCCESS: return placeOrderSuccess(state, action)
      case PLACE_ORDER_FAIL: return placeOrderFail(state, action)
      default: return state
   }
}

export default orderReducer;
import {
   SET_PRODUCT_FILTER,
} from '../constants/ActionTypes'

export const setProductFilter = (filter) => ({
   type: SET_PRODUCT_FILTER,
   filter
})
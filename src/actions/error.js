import {
   ADD_ERROR,
   REMOVE_ERROR,
} from '../constants/ActionTypes.js'

export const addError = error => ({
   type: ADD_ERROR,
   error
})

export const removeError = error => ({
   type: REMOVE_ERROR,
})
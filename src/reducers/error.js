import {
   ADD_ERROR,
   REMOVE_ERROR,
} from '../constants/ActionTypes.js'

const initialState = {
   message: null,
}

const addError = (state, action) => ({
   ...state,
   message: action.error,
})

const removeError = (state, action) => ({
   ...state,
   message: null,
})

const errorReducer = (state=initialState, action) => {
   switch (action.type) {
      case ADD_ERROR: return addError(state, action)
      case REMOVE_ERROR: return removeError(state, action)
      default: return state
   }
}

export default errorReducer;
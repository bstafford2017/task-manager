import { GET_ERRORS, CLEAR_ERRORS } from '../Actions'

const initialState = {
  message: '',
  status: null,
  id: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return {
        message: '',
        status: '',
        id: null
      }
    default:
      return {
        ...state
      }
  }
}

import {
    GET_USER,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER
} from '../actions/types'

const initialState = {
    user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        admin: false
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state
            }
        case ADD_USER:
            return {
                ...state
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case DELETE_USER:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
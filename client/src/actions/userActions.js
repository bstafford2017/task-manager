import {
    GET_USER,
    ADD_USER,
    DELETE_USER,
    UPDATE_USER
} from './types'

export const getUser = () => {
    return {
        type: GET_USER,
    }
}

export const addUser = (addUser) => {
    return {
        type: ADD_USER,
        payload: addUser
    }
}

export const updateUser = (updateUser) => {
    return {
        type: UPDATE_USER,
        payload: updateUser
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id
    }
}

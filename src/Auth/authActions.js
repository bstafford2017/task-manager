import {
  USER_LOADING,
  USER_LOADED,
  UPDATE_USER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  DELETE_USER,
  LOGIN_ERROR
} from '../Actions'
import { clearErrors, setErrors } from '../Error/errorActions'
import axios from '../Http/index'

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  }

  return config
}

export const login = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', user)
    dispatch(clearErrors())
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
  } catch (e) {
    dispatch(setErrors('Failed to login: ' + e.message))
    dispatch({
      type: LOGIN_ERROR
    })
  }
}

export const register = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users', user)
    dispatch(clearErrors())
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
  } catch (e) {
    dispatch(setErrors('Failed to register: ' + e.message))
    dispatch({
      type: REGISTER_ERROR
    })
  }
}

export const updateUser = (updatedUser) => async (dispatch, getState) => {
  try {
    await axios.post(
      `/api/auth/${updatedUser.id}`,
      updatedUser,
      tokenConfig(getState)
    )
    dispatch(clearErrors())
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser
    })
  } catch (e) {
    dispatch(setErrors('Failed to update user: ' + e.message))
  }
}

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id
  }
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING })
    const response = await axios.get('/api/auth/user', tokenConfig(getState))
    dispatch({
      type: USER_LOADED,
      payload: response.data
    })
  } catch (e) {
    dispatch(setErrors('Failed to register: ' + e.message))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

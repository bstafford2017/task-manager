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
import { returnErrors } from '../Error/errorActions'
import axios from 'axios'

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token
  }

  return config
}

export const login = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', user)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    returnErrors(err.response.data, err.response.status, err.response.msg)
    dispatch({
      type: LOGIN_ERROR
    })
  }
}

export const register = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/register', user)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    returnErrors(
      err.response.data,
      err.response.status,
      'System Error: Failed to register'
    )
    dispatch({
      type: REGISTER_ERROR
    })
  }
}

export const updateUser = (updatedUser) => async (dispatch, getState) => {
  try {
    await axios.post(
      `/api/auth/${updatedUser._id}`,
      updatedUser,
      tokenConfig(getState)
    )
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser
    })
  } catch (err) {
    returnErrors(
      err.response.data,
      err.response.status,
      'System Error: Failed to register'
    )
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
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

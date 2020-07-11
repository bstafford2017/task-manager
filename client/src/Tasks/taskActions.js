import {
  TASKS_LOADED,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  AUTH_ERROR,
  UPDATE_TASK
} from '../types'
import axios from 'axios'
import { tokenConfig } from '../Auth/authActions'
import { returnErrors } from '../Error/errorActions'

export const getTasks = () => async (dispatch, getState) => {
  try {
    dispatch(setTasksLoading())
    const response = await axios.get('/api/tasks', tokenConfig(getState))
    dispatch({
      type: TASKS_LOADED,
      payload: response.data
    })
  } catch (err) {
    alert(err)
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'System Error: Failed to get tasks.'
      )
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const addTask = (addTask) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      '/api/tasks',
      addTask,
      tokenConfig(getState)
    )
    dispatch({
      type: ADD_TASK,
      payload: response.data
    })
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'System Error: Failed to add task.'
      )
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    await axios.post(`/api/tasks/${task._id}`, task, tokenConfig(getState))
    dispatch({
      type: UPDATE_TASK,
      payload: task
    })
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'System Error: Failed to delete task.'
      )
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/tasks/${id}`, tokenConfig(getState))
    dispatch({
      type: DELETE_TASK,
      payload: id
    })
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'System Error: Failed to delete task.'
      )
    )
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  }
}

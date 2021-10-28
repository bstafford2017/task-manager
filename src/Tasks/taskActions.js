import {
  TASKS_LOADED,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  AUTH_ERROR,
  UPDATE_TASK
} from '../Actions'
import axios from '../Http/index'
import { tokenConfig } from '../Auth/authActions'
import { clearErrors, setErrors } from '../Error/errorActions'

export const getTasks = () => async (dispatch, getState) => {
  try {
    dispatch(setTasksLoading())
    const response = await axios.get('/api/tasks', tokenConfig(getState))
    dispatch(clearErrors())
    dispatch({
      type: TASKS_LOADED,
      payload: response.data
    })
  } catch (e) {
    dispatch(setErrors('Failed to create task: ' + e.message))
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
    dispatch(clearErrors())
    dispatch({
      type: ADD_TASK,
      payload: response.data
    })
  } catch (e) {
    dispatch(setErrors('Failed to create task: ' + e.message))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    await axios.post(`/api/tasks/${task.id}`, task, tokenConfig(getState))
    dispatch(clearErrors())
    dispatch({
      type: UPDATE_TASK,
      payload: task
    })
  } catch (e) {
    dispatch(setErrors('Failed to create task: ' + e.message))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/tasks/${id}`, tokenConfig(getState))
    dispatch(clearErrors())
    dispatch({
      type: DELETE_TASK,
      payload: id
    })
  } catch (e) {
    dispatch(setErrors('Failed to create task: ' + e.message))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const addComment = (taskId, comment) => async (dispatch, getState) => {
  try {
    await axios.post(`/api/comments/${taskId}`, comment, tokenConfig(getState))
    dispatch(clearErrors())
  } catch (e) {
    dispatch(setErrors('Failed to create task: ' + e.message))
  }
}

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  }
}

import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    TASKS_LOADING
} from './types'
import axios from 'axios'

export const getTasks = () => async dispatch => {
    dispatch(setTasksLoading())
    const response = await axios.get('api/tasks')
    dispatch({
        type: GET_TASKS,
        payload: response.data
    })
}

export const addTask = (addTask) => async dispatch => {
    const response = await axios.post('api/tasks', addTask)
    dispatch({
        type: ADD_TASK,
        payload: response.data
    })
}

export const deleteTask = (id) => async dispatch => {
    await axios.delete(`api/tasks/${id}`)
    dispatch({
        type: DELETE_TASK,
        payload: id
    })
}

export const setTasksLoading = () => {
    return {
        type: TASKS_LOADING
    }
}
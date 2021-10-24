import {
  TASKS_LOADED,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  UPDATE_TASK
} from '../Actions'

const initialState = {
  tasks: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TASKS_LOADED:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((e) => e.id !== action.payload.id),
          action.payload
        ].sort((a, b) => {
          return b.date - a.date
        })
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      }
    case TASKS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return {
        ...state
      }
  }
}

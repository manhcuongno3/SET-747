import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS
} from './taskActions'

const initialState = {
  tasks: [],
  loading: false,
  error: null
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { ...state, loading: true }
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload]
      }
    case ADD_TASK_FAILURE:
      return { ...state, loading: false, error: action.error }

    case FETCH_TASK_REQUEST:
      return { ...state, loading: true }
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      }
    case FETCH_TASK_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export default taskReducer

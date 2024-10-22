import { combineReducers } from 'redux'
import taskReducer from '../app/features/tasks/taskReducer'
const rootReducer = combineReducers({
  task: taskReducer
})

export default rootReducer

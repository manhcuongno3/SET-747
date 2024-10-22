// redux/sagas/index.js
import { all } from 'redux-saga/effects'
import { watchFetchTask, watchAddTask } from '../app/features/tasks/taskSaga'

export default function* rootSaga () {
  yield all([watchAddTask(), watchFetchTask()])
}

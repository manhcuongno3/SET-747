import { call, put, takeLatest } from 'redux-saga/effects'
import {
  ADD_TASK_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  FETCH_TASK_FAILURE,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS
} from './taskActions'
import { addTaskAPI, fetchTaskAPI } from '../../apis/tasks'

function* addTask (action) {
  try {
    const response = yield call(addTaskAPI, action.payload)
    yield put({ type: ADD_TASK_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: ADD_TASK_FAILURE, error: error.message })
  }
}

function* fetchTask () {
  try {
    const response = yield call(fetchTaskAPI)
    console.log(response);
    
    yield put({ type: FETCH_TASK_SUCCESS, payload: response.data })
  } catch (error) {
    yield put({ type: FETCH_TASK_FAILURE, error: error.message })
  }
}

export function* watchFetchTask () {
  yield takeLatest(FETCH_TASK_REQUEST, fetchTask)
}

export function* watchAddTask () {
  yield takeLatest(ADD_TASK_REQUEST, addTask)
}

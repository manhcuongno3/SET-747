import axios from 'axios'
import { API_ROOT, API_TASK } from '../../utils/constants'

export const fetchTaskAPI = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/${API_TASK}`)
    return response
  } catch (error) {
    throw error
  }
}

export const addTaskAPI = async data => {
  try {
    const response = await axios.post(`${API_ROOT}/${API_TASK}`, data)
    return response
  } catch (error) {
    throw error
  }
}

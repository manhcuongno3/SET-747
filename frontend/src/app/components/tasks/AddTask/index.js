// components/AddTask.js
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskRequest } from '../../../features/tasks/taskActions'

const AddTask = () => {
  const [task, setTask] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.task)

  const handleAddTask = () => {
    dispatch(addTaskRequest({ taskName: task, isChecked: false }))
    setTask('')
  }

  return (
    <div>
      <input
        type='text'
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder='Enter task'
      />
      <button onClick={handleAddTask} disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default AddTask

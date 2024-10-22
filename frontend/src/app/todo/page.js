'use client';

import { useDispatch, useSelector } from 'react-redux';
import AddTask from '../components/tasks/AddTask';
import { useEffect } from 'react';
import { fetchTaskRequest } from '../features/tasks/taskActions';

const TodoPage = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.task);

  useEffect(() => {
    dispatch(fetchTaskRequest());
  }, [dispatch]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tasks || tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <>
      <AddTask />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.taskName || 'Unnamed task'}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoPage;

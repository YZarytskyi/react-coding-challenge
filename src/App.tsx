import { useEffect, useState } from 'react';

import Button from './components/Button';
import AddEditTaskForm from './components/ModalAddEditTaskForm';
import TaskCard from './components/TaskCard';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { fetchTaskList, selectTaskList } from './store/mainSlice';

import './App.scss';

import { ReactComponent as Add } from './assets/icons/add.svg';

const App = () => {
  const dispatch = useAppDispatch();

  const [isModalAddTaskOpened, setIsModalAddTaskOpened] = useState(false);

  const taskList = useAppSelector(selectTaskList);

  useEffect(() => {
    dispatch(fetchTaskList());
  }, []);

  const toggleModalAddTask = () => {
    setIsModalAddTaskOpened(prev => !prev);
  };

  return (
    <>
      <div className="container">
        <div className="page-wrapper">
          <div className="top-title">
            <h2>Task List</h2>
            <Button
              title="Add Task"
              icon={<Add />}
              onClick={toggleModalAddTask}
            />
          </div>
          <div className="task-container">
            {taskList.length > 0 ? (
              taskList.map(task => <TaskCard key={task.id} task={task} />)
            ) : (
              <p>No tasks</p>
            )}
          </div>
        </div>
      </div>

      {isModalAddTaskOpened && (
        <AddEditTaskForm closeModal={toggleModalAddTask} />
      )}
    </>
  );
};

export default App;

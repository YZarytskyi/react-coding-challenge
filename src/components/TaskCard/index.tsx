import classNames from 'classnames';
import { FC, useState } from 'react';

import { STATUS_PROGRESS_MAP, TASK_STATUS_OPTIONS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { selectTaskList, setTaskList } from '../../store/mainSlice';
import CircularProgressBar from '../CircularProgressBar';
import DeleteModal from '../DeleteModal';
import AddEditTaskForm from '../ModalAddEditTaskForm';

import { TaskType } from '../../types';

import './style.scss';

import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';

interface TaskCardProps {
  task: TaskType;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { id, title, priority, status, progress } = task;

  const dispatch = useAppDispatch();

  const [isModalEditTask, setIsModalEditTask] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const taskList = useAppSelector(selectTaskList);

  const handleChangeStatus = () => {
    const currentStatusIndex = TASK_STATUS_OPTIONS.indexOf(status);
    const newStatus =
      currentStatusIndex === TASK_STATUS_OPTIONS.length - 1
        ? TASK_STATUS_OPTIONS[0]
        : TASK_STATUS_OPTIONS[currentStatusIndex + 1];

    const newTaskList: TaskType[] = taskList.map(task =>
      task.id === id
        ? {
            ...task,
            status: newStatus,
            progress: STATUS_PROGRESS_MAP.get(newStatus)!,
          }
        : task,
    );
    dispatch(setTaskList(newTaskList));
  };

  const onClickDeleteTask = () => {
    dispatch(setTaskList(taskList.filter(task => task.id !== id)));
    toggleModalDelete();
  };

  const toggleModalEditTask = () => {
    setIsModalEditTask(prev => !prev);
  };

  const toggleModalDelete = () => {
    setIsModalDeleteOpen(prev => !prev);
  };

  return (
    <>
      <div className="task-card">
        <div className="task-heading-container">
          <div className="flex w-100">
            <span className="task-title">Task</span>
            <span className="task">{title}</span>
          </div>
          <div className="flex">
            <span className="priority-title">Priority</span>
            <span className={classNames(`${priority}-priority`, 'priority')}>
              {priority}
            </span>
          </div>
        </div>
        <div className="task-info-wrapper">
          <div className="task-status-progress-wrapper">
            <div className="task-status-wrapper">
              <button className="status" onClick={handleChangeStatus}>
                {status}
              </button>
            </div>
            <div className="progress">
              <CircularProgressBar
                strokeWidth={2}
                sqSize={24}
                percentage={progress}
              />
            </div>
          </div>
          <div className="actions">
            <EditIcon className="mr-20 cp" onClick={toggleModalEditTask} />
            <DeleteIcon className="cp" onClick={toggleModalDelete} />
          </div>
        </div>
      </div>

      {isModalEditTask && (
        <AddEditTaskForm
          variant="edit"
          task={task}
          closeModal={toggleModalEditTask}
        />
      )}

      {isModalDeleteOpen && (
        <DeleteModal
          onClickDeleteTask={onClickDeleteTask}
          closeModal={toggleModalDelete}
        />
      )}
    </>
  );
};

export default TaskCard;

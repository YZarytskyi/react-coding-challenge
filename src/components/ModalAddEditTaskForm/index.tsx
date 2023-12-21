import classNames from 'classnames';
import { FC, MouseEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TASK_PRIORITY_OPTIONS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { selectTaskList, setTaskList } from '../../store/mainSlice';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import { TaskPriorityType, TaskType } from '../../types';

import './style.scss';

import { ReactComponent as Close } from '../../assets/icons/close.svg';

interface ModalAddEditTaskFormProps {
  variant?: 'add' | 'edit';
  task?: TaskType;
  closeModal: () => void;
}

const ModalAddEditTaskForm: FC<ModalAddEditTaskFormProps> = ({
  variant = 'add',
  task,
  closeModal,
}) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(task?.title || '');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriorityType>(
    task?.priority || 'high',
  );

  const taskList = useAppSelector(selectTaskList);

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    const newTaskList = (): TaskType[] => {
      if (variant === 'add') {
        const newTask: TaskType = {
          id: uuidv4(),
          title: inputValue,
          priority: selectedPriority,
          status: 'To Do',
          progress: 0,
        };
        return [newTask, ...taskList];
      } else {
        return taskList.map(prevTask =>
          prevTask.id === task?.id
            ? { ...prevTask, title: inputValue, priority: selectedPriority }
            : prevTask,
        );
      }
    };
    dispatch(setTaskList(newTaskList()));

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{variant} Task</span>
            <Close className="cp" onClick={closeModal} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            name="title"
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {TASK_PRIORITY_OPTIONS.map(priority => (
                <li
                  role="button"
                  key={priority}
                  className={classNames(
                    selectedPriority === priority &&
                      `${selectedPriority}-selected`,
                    priority,
                  )}
                  onClick={() => setSelectedPriority(priority)}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={variant}
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
              className="submit-btn"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddEditTaskForm;

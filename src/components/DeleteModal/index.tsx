import { FC } from 'react';

import Button from '../Button';
import Modal from '../Modal';

import './style.scss';

interface DeleteModalProps {
  onClickDeleteTask: () => void;
  closeModal: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  onClickDeleteTask,
  closeModal,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={onClickDeleteTask} />
          <Button title="Cancel" outline onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

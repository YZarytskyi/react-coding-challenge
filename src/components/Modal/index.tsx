import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import useEscapeKey from '../../hooks/useEscape';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import './style.scss';

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
};

const Modal = ({ children, closeModal }: ModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEscapeKey(closeModal);
  useOutsideClick(modalContentRef, closeModal);

  return createPortal(
    <div className="modal">
      <div className="modal-content" ref={modalContentRef}>
        {children}
      </div>
    </div>,
    document.getElementById('root')!,
  );
};

export default Modal;

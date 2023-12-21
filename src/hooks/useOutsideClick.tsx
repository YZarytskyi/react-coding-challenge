import { RefObject, useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handleClose: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);
}

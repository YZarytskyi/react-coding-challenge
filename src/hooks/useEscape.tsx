import { useCallback, useEffect } from 'react';

import { KEY_UP_EVENT_TYPE, KEY_NAME_ESC } from '../constants';

function useEscapeKey(handleClose: () => void): void {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    document.addEventListener(KEY_UP_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_UP_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

export default useEscapeKey;

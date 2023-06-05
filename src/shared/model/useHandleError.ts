import { useCallback } from 'react';
import { createAlert } from '../ui/Notifier/notifierSlice';
import { useAppDispatch } from './reduxHooks';

export function useHandleError() {
  const dispatch = useAppDispatch();

  const handleError = useCallback(
    (error: Error) => {
      dispatch(
        createAlert({
          message: error.message,
        })
      );
    },
    [dispatch]
  );

  return handleError;
}

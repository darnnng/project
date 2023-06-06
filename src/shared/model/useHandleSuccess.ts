import { useCallback } from 'react';
import { createAlert } from '../ui/Notifier/notifierSlice';
import { useAppDispatch } from './reduxHooks';

export function useHandleSuccess() {
  const dispatch = useAppDispatch();

  const handleSuccess = useCallback(
    (message: string) => {
      dispatch(
        createAlert({
          message: message,
          type: 'success',
        })
      );
    },
    [dispatch]
  );

  return handleSuccess;
}

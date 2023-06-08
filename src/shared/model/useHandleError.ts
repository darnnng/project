import { useCallback } from 'react';
import { createAlert } from '../ui/Notifier/notifierSlice';
import { useAppDispatch } from './reduxHooks';

export function useHandleError() {
  const dispatch = useAppDispatch();

  const handleError = useCallback(
    (error: Error) => {
      console.log('error', error);
      dispatch(
        createAlert({
          message: (error as unknown) as string,
          type: 'error',
        })
      );
    },
    [dispatch]
  );

  return handleError;
}

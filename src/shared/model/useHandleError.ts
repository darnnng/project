/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { createAlert } from '../ui/Notifier/notifierSlice';
import { useAppDispatch } from './reduxHooks';

export function useHandleError() {
  const dispatch = useAppDispatch();
  const handleError = useCallback(
    (error: any) => {
      dispatch(
        createAlert({
          message: (error.code as string) || '',
          type: 'error',
        })
      );
    },
    [dispatch]
  );

  return handleError;
}

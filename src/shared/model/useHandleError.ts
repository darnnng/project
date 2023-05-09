import { createAlert } from './notifierSlice';
import { useAppDispatch } from './reduxHooks';

export function useHandleError() {
  const dispatch = useAppDispatch();

  const handleError = (error: Error) => {
    dispatch(
      createAlert({
        message: error.message,
      })
    );
  };

  return handleError;
}

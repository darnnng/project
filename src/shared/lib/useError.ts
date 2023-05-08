import { createAlert } from '../model/notifierSlice';
import { useAppDispatch } from '../model/reduxHooks';

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

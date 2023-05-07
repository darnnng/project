import { useAppSelector } from '../shared/model/reduxHooks';

export function useAuth() {
  const user = useAppSelector((state) => state.user);
  return !!user.userId;
}

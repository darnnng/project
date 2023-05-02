import { useAppSelector } from './reduxHooks';

export function useAuth() {
  const user = useAppSelector((state) => state.user);
  return !!user.userId;
}

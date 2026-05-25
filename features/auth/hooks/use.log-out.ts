import { useLogoutMutation } from '../api/sign-in.api';

export const useLogOutMutationAction = () => {
  const [trigger, result] = useLogoutMutation();

  const logout = async () => {
    return await trigger().unwrap();
  };

  return {
    logout,
    ...result,
  };
};

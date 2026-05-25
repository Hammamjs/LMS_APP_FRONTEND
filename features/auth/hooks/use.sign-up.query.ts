import { useSignUpMutation } from '../api/sign-up.api';
import { RegisterRequest } from '../types/types';
import { useToast } from '@/shared/hooks';

export const useSignUpMutationAction = () => {
  const [trigger, result] = useSignUpMutation();

  const signup = (user: RegisterRequest) => {
    return trigger(user).unwrap();
  };

  return { signup, ...result };
};

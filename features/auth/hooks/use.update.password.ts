import { useUpdatePasswordMutation } from '../api/sign-in.api';
import { TUpdatePasswordSchema } from '../schema/update.password.validation';

export const useUpdatePassword = () => {
  const [trigger, result] = useUpdatePasswordMutation();

  const updatePassword = async (data: TUpdatePasswordSchema) => {
    return trigger(data).unwrap();
  };

  return {
    updatePassword,
    ...result,
  };
};

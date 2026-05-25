import { useResetPasswordMutation } from '../api/reset-password.api';
import { TResetPasswordSchema } from '../schema/reset-password.schema';

export const useResetPassword = () => {
  const [trigger, result] = useResetPasswordMutation();

  const resetPassword = async (
    data: TResetPasswordSchema & { email: string },
  ) => {
    console.log(data);
    return await trigger({ ...data }).unwrap();
  };

  return {
    resetPassword,
    ...result,
  };
};

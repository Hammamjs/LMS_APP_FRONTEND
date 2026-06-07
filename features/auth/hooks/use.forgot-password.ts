import { useForgotPasswordMutation } from '../api/forgot-password.api';

export const useForgotPasswordAction = () => {
  const [trigger, result] = useForgotPasswordMutation();

  const sendResetCode = async (email: string) => {
    return await trigger({ email }).unwrap();
  };

  return {
    sendResetCode,
    ...result,
  };
};

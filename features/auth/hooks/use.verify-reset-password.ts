import { useVerifyResetPasswordMutation } from '../api/verify-code.api';

export const useVerifyResetPassword = () => {
  const [trigger, result] = useVerifyResetPasswordMutation();

  const verifyCode = async (code: string, email: string) => {
    await trigger({ code, email }).unwrap();
  };

  return {
    verifyCode,
    ...result,
  };
};

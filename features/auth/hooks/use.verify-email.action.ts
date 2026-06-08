import { useVerifyEmailMutation } from '../api/verify-email.api';

export const useVerifyEmailAction = () => {
  const [trigger, result] = useVerifyEmailMutation();

  const verify = async (code: string, email: string) => {
    return await trigger({ code, email }).unwrap();
  };

  return {
    verify,
    ...result,
  };
};

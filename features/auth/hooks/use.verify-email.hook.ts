import { useToast } from '@/shared/hooks';
import { useVerifyEmailMutation } from '../api/verify-email.api';

export const useVerifyEmail = () => {
  const [trigger, result] = useVerifyEmailMutation();
  const { toast } = useToast();

  const verify = async (code: string, email: string) => {
    try {
      const response = await trigger({ code, email }).unwrap();
      toast({ title: response.message });
    } catch (err: any) {
      console.log(err);
      toast({ title: err.data.error, description: err.data.message });
    }
  };

  return {
    verify,
    ...result,
  };
};

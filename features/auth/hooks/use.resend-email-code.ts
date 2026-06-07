import { useToast } from '@/shared/hooks';
import { useResendCodeMutation } from '../api/verify-email.api';

export const useResendEmailCode = () => {
  const [trigger, result] = useResendCodeMutation();
  const { toast } = useToast();

  const resend = async (email: string) => {
    try {
      const response = await trigger({ email }).unwrap();
      toast({ title: response.message });
    } catch (err) {
      toast({ title: 'Failed to resend code.' });
    }
  };

  return { resend, ...result };
};

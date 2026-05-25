import { useToast } from '@/shared/hooks';
import { usePayMutation } from '../store/checkout.api';
import { type PaymentRequest } from '../types/types';

export const usePaymentMutation = () => {
  const [trigger, result] = usePayMutation();
  const { toast } = useToast();

  const pay = async (data: PaymentRequest) => {
    try {
      const response = await trigger(data);

      const resultData = response.data;

      toast({
        title: 'Success',
        description: 'Redirecting to your dashboard...',
      });

      return resultData;
    } catch (err) {
      console.log('From payment Error');
      console.log(err);
      toast({
        title: 'Payment Declined',
        description:
          err instanceof Error
            ? err.message
            : 'Please check your card details.',
        variant: 'destructive',
      });
    }
  };

  return { pay, ...result };
};

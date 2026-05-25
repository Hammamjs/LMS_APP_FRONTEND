import { PaymentResponse } from '../types/types';
import { Payments } from './payments';

type PaymentProps = {
  payments: PaymentResponse[];
};

export const PaymentHistoryMapper = ({ payments }: PaymentProps) => {
  return payments.map((payment) => (
    <Payments key={payment.id} payment={payment} />
  ));
};

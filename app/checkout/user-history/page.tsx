import { AccountPaymentsComponent } from '@/features/checkout/components';

export const metadata = {
  title: 'My payments — LearnHub',
  description: 'Track your purchases, receipts and refund history.',
};

export default function CheckoutPaymentHistory() {
  return <AccountPaymentsComponent />;
}

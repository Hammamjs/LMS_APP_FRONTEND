import { VerifyEmailComponent } from '@/features/auth/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify your email — LearnHub',
  description:
    'Enter the 6-digit code sent to your email to verify your LearnHub account.',
};

export default function VerifyEmailPage() {
  return <VerifyEmailComponent />;
}

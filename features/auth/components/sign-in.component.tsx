import { Suspense } from 'react';
import { SignInComponent } from '@/features/auth/components';

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
}

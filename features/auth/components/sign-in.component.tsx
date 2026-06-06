import { Suspense } from 'react';
import { SignInComponent } from '@/features/auth/components';

export function SignInComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
}

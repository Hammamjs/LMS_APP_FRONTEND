import { Suspense } from 'react';
import { SignInContent } from './sign-in.content';

export function SignInComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

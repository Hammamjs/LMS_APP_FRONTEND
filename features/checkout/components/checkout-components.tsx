import { Suspense } from 'react';
import { CheckoutContent } from './checkout';

export function CheckoutComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

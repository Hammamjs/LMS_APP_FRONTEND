import { Suspense } from 'react';
import { FailedContent } from './checkout-failed';

export function PaymentFailedComponent() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
          <div className="animate-pulse text-center">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-muted" />
            <div className="mx-auto mb-2 h-8 w-64 rounded bg-muted" />
            <div className="mx-auto h-6 w-48 rounded bg-muted" />
          </div>
        </div>
      }
    >
      <FailedContent />
    </Suspense>
  );
}

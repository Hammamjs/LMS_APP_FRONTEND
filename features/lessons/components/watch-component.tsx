import { Suspense } from 'react';
import { WatchContent } from './watch-content';

export const WatchComponent = () => {
  return (
    <Suspense fallback={<div>isLoading ...</div>}>
      <WatchContent />
    </Suspense>
  );
};

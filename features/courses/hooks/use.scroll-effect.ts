import { useEffect } from 'react';

type UseScrollEffect = {
  inView: boolean;
  hasNext: boolean | undefined;
  isFetching: boolean;
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const useScrollEffect = ({
  hasNext,
  inView,
  isFetching,
  isLoading,
  setPage,
}: UseScrollEffect) => {
  useEffect(() => {
    if (!inView) return;

    if (!hasNext) return;

    if (isFetching || isLoading) return;

    setPage((prev) => prev + 1);
  }, [inView, hasNext, isFetching, isLoading]);
};

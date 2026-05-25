import { useSearchParams } from 'next/navigation';

const useUrlParams = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || null;

  return {
    initialQuery,
    initialCategory,
  };
};

export default useUrlParams;

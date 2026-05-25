import { useRouter } from 'next/navigation';

type Props = {
  courseId: string | null;
};

export const useHandleRetry = ({ courseId }: Props) => {
  const router = useRouter();

  const handleRetry = () => {
    if (courseId) {
      router.push(`/checkout?courseId=${courseId}`);
    } else {
      router.push('/courses');
    }
  };

  return {
    handleRetry,
  };
};

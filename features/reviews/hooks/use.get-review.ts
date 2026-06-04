import { useGetReviewsQuery } from '../api/review.api';

type Props = {
  courseId: string;
};

export const useGetReviews = ({ courseId }: Props) => {
  const { data: reviews, isLoading } = useGetReviewsQuery({ courseId });

  return {
    reviews,
    isLoading,
  };
};

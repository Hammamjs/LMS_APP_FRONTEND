import { useUpdateReviewMutation } from '../api/review.api';

type Props = {
  courseId: string;
  rating: number;
  content: string;
};
export const useUpdateReviewAction = () => {
  const [trigger, result] = useUpdateReviewMutation();

  const update = async (props: Props) => {
    await trigger(props).unwrap();
  };

  return {
    update,
    ...result,
  };
};

import { useRemoveReviewMutation } from '../api/review.api';

type Props = {
  courseId: string;
};

export const useRemoveReviewAction = () => {
  const [trigger, result] = useRemoveReviewMutation();

  const remove = async ({ courseId }: Props) => {
    await trigger({ courseId }).unwrap();
  };

  return {
    remove,
    ...result,
  };
};

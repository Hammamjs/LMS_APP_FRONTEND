import { useAddReviewMutation } from '../api/review.api';
import { TReviewSchema } from '../schema/review.schema';

export const useAddReviewAction = () => {
  const [trigger, result] = useAddReviewMutation();

  const add = async (data: TReviewSchema) => {
    console.log('From use action ', data);
    await trigger(data).unwrap();
  };

  return {
    add,
    ...result,
  };
};

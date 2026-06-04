import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/hooks';
import { useAddReviewAction } from '../hooks/use.add-review.action';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store';
import { useGetReviews } from '../hooks/use.get-review';
import { useUpdateReviewAction } from '../hooks/use.update-review.action';
import {
  DEFUALT_REVIEW_VALUES,
  ReviewSchema,
  TReviewSchema,
} from '../schema/review.schema';
import { useEffect, useMemo } from 'react';

type Props = {
  mode: 'create' | 'edit';
  courseId: string;
  close: () => void;
};

export const useReviewForm = ({ mode, courseId, close }: Props) => {
  const isEdit = mode == 'edit';
  const userId = useSelector(selectCurrentUser)?.id;

  const { reviews } = useGetReviews({ courseId });

  const { add, isLoading: isAdding } = useAddReviewAction();

  const { update, isLoading: isUpdating } = useUpdateReviewAction();

  const userReview = useMemo(() => {
    return reviews?.data.find(
      (r) => r.userId === userId && r.courseId === courseId,
    );
  }, [reviews, userId, courseId]);

  const { register, watch, handleSubmit, setValue, reset } =
    useForm<TReviewSchema>({
      defaultValues: DEFUALT_REVIEW_VALUES,
    });

  useEffect(() => {
    if (isEdit && userReview) {
      reset({
        rating: userReview.rating,
        content: userReview.content,
        courseId,
      });
    }
  }, [isEdit, courseId, userReview]);

  const { toast } = useToast();

  const onSubmit = async (data: TReviewSchema) => {
    const result = ReviewSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((e) => toast({ title: e.message }));
      return;
    }

    try {
      if (isEdit) {
        await update({
          ...data,
          courseId,
        });
        toast({ title: 'Review updated successfully' });
      } else {
        await add({
          ...data,
          courseId,
        });
        toast({ title: 'Review added successfully' });
      }
    } catch (err: any) {
      const message =
        err.data.message ?? 'Failed to add review please try later';

      toast({ title: message });
      console.log(err);
    }

    close();
  };

  return {
    onSubmit,
    register,
    watch,
    handleSubmit,
    setValue,
    isLoading: isAdding || isUpdating,
    isEdit,
  };
};

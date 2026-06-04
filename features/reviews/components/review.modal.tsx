import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from '@/shared/ui';
import { Loader2, X } from 'lucide-react';
import { Stars } from './Stars';
import { useReviewForm } from '../hooks/use.review-form';

type ReviewModalProps = {
  close: () => void;
  courseId: string;
  mode: 'create' | 'edit';
};

export function ReviewModal({ close, courseId, mode }: ReviewModalProps) {
  const {
    handleSubmit,
    isLoading,
    onSubmit,
    register,
    setValue,
    watch,
    isEdit,
  } = useReviewForm({ close, courseId, mode });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Write a Review</CardTitle>

          <Button variant="ghost" size="icon" onClick={close}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Rating */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Your Rating</p>

            <Stars
              value={watch('rating')}
              onChange={(n) => setValue('rating', n)}
              interactive
            />
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Your Review</p>

            <Textarea
              rows={5}
              placeholder="Tell others what you liked or disliked about this course..."
              {...register('content')}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={close} disabled={isLoading}>
              Cancel
            </Button>

            <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin">
                  Update review
                </Loader2>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

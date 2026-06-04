import { Avatar, AvatarFallback, Button } from '@/shared/ui';
import { Stars } from './Stars';
import { Loader, Pencil, ThumbsUp, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Review } from '../types/review.type';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store';
import { useRemoveReviewAction } from '../hooks/use.remove-review.action';
import { useToast } from '@/shared/hooks';
import { useEffect } from 'react';

export type Props = {
  review: Review;
  onEdit?: (review: Review) => void;
};

export const ReviewCard = ({ review, onEdit }: Props) => {
  const userId = useSelector(selectCurrentUser)?.id;

  const isUserReview = review.userId == userId;

  const {
    remove,
    isLoading: isDeleting,
    isError,
    error,
  } = useRemoveReviewAction();

  const { toast } = useToast();

  const handleOnDelete = async (courseId: string) => {
    try {
      await remove({ courseId });
      toast({ title: 'Review deleted successfully' });
    } catch (err) {
      toast({ title: 'Failed to delete review please try again' });
    }
  };

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError, error]);

  return (
    <li className="flex gap-3 border-t pt-4 first:border-t-0 first:pt-0">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-primary/10 text-xs text-primary">
          {review.user.avatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{review.user.username}</span>

            <Stars value={review.rating} />
          </div>

          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(review.updatedAt, {
              addSuffix: true,
            })}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{review.content}</p>

        <div className="flex items-center justify-between pt-1">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <ThumbsUp className="h-3.5 w-3.5" />
          </Button>

          {isUserReview && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => onEdit?.(review)}
                disabled={isDeleting}
              >
                <Pencil className="mr-1 h-3.5 w-3.5" />
                Update
              </Button>

              <Button
                variant="ghost"
                size="sm"
                disabled={isDeleting}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                onClick={() => handleOnDelete(review.courseId)}
              >
                {isDeleting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

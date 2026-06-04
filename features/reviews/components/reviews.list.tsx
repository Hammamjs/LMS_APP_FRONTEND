import { Review } from '../types/review.type';
import { ReviewCard } from './review.card';

type Props = {
  reviews: Review[];
  onEdit: () => void;
};

export const ReviewsList = ({ reviews, onEdit }: Props) => {
  return reviews.map((review) => (
    <ReviewCard review={review} onEdit={onEdit} key={review.id} />
  ));
};

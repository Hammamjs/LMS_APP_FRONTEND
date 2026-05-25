import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from '@/shared/ui';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Stars } from './Stars';

type ReviewModalProps = {
  close: () => void;
};

export function ReviewModal({ close }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log({
      rating,
      comment,
    });

    close();
  };

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

            <Stars value={rating} onChange={setRating} interactive />
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Your Review</p>

            <Textarea
              rows={5}
              placeholder="Tell others what you liked or disliked about this course..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>

            <Button onClick={handleSubmit}>Submit Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

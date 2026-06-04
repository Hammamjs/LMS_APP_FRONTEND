'use client';

import { useState } from 'react';

import { MessageSquare } from 'lucide-react';

import { Button, Badge, Progress, Card, CardContent } from '../../../shared/ui';

import { useSelector } from 'react-redux';
import { selectIsEnrolled } from '@/features/courses/store/enrollment.store';
import { ReviewModal } from './review.modal';
import { useGetReviews } from '../hooks/use.get-review';
import { ReviewsList } from './reviews.list';
import { useReviewForm } from '../hooks/use.review-form';
import { useRemoveReviewAction } from '../hooks/use.remove-review.action';

// const defaultReviews: Review[] = [
//   {
//     id: 'r1',
//     name: 'Sarah Mitchell',
//     initials: 'SM',
//     rating: 5,
//     date: '2 days ago',
//     comment:
//       'Incredibly clear explanations. The pacing is perfect and the examples are real-world useful.',
//     helpful: 24,
//   },
//   {
//     id: 'r2',
//     name: 'James Carter',
//     initials: 'JC',
//     rating: 4,
//     date: '1 week ago',
//     comment:
//       'Great content overall. Would love more downloadable resources alongside the videos.',
//     helpful: 12,
//   },
// ];

const distribution = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 1 },
];

type Props = {
  courseId: string;
};

export function ReviewsSection({ courseId }: Props) {
  const [showModal, setShowModal] = useState(false);

  const [mode, setMode] = useState<'create' | 'edit'>('create');

  const isEnrolled = useSelector(selectIsEnrolled);

  const { reviews, isLoading } = useGetReviews({ courseId });

  return (
    <>
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />

              {/* <h3 className="text-lg font-semibold">{title}</h3> */}

              <Badge variant="secondary">
                {reviews?.data.length.toLocaleString()}
              </Badge>
            </div>

            {isEnrolled && (
              <Button size="sm" onClick={() => setShowModal(true)}>
                Write Review
              </Button>
            )}
          </div>

          {/* Rating Overview */}
          <div className="grid gap-6 rounded-lg border bg-muted/30 p-5 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-center justify-center gap-1 sm:border-r sm.pr-6">
              {/* <span className="text-4xl font-bold">{average.toFixed(1)}</span> */}

              {/* <Stars value={Math.round(average)} /> */}

              <span className="text-xs text-muted-foreground">
                {reviews?.data.length.toLocaleString()} ratings
              </span>
            </div>

            <div className="space-y-2">
              {distribution.map((d) => (
                <div key={d.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-muted-foreground">{d.stars}★</span>

                  <Progress value={d.pct} className="h-2 flex-1" />

                  <span className="w-8 text-right text-muted-foreground">
                    {d.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <ul className="space-y-4">
            <ReviewsList
              reviews={reviews?.data ?? []}
              onEdit={() => {
                setMode('edit');
                setShowModal(true);
              }}
            />
          </ul>
        </CardContent>
      </Card>

      {/* REVIEW MODAL */}
      {showModal && (
        <ReviewModal
          close={() => setShowModal(false)}
          courseId={courseId}
          mode={mode}
        />
      )}
    </>
  );
}

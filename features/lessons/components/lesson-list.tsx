'use client';
import { Play, Lock, CheckCircle } from 'lucide-react';
import { Lesson } from '@/features/lessons';
import { cn } from '@/shared/lib/utils';
import { useSelector } from 'react-redux';
import { selectIsEnrolled } from '../../courses/store/enrollment.store';

interface LessonListProps {
  lessons: Lesson[] | undefined;
  currentLessonId?: string;
  onLessonClick?: (lessonId: string) => void;
  completedLessons?: string[];
}

export function LessonList({
  lessons,
  currentLessonId,
  onLessonClick,
  completedLessons = [],
}: LessonListProps) {
  if (!lessons?.length) return null;

  const isEnrolled = useSelector(selectIsEnrolled);

  return (
    <div className="space-y-1">
      {lessons.map((lesson, index) => {
        // REAL LOGIC: Accessible if it's a free preview OR the user is enrolled
        const isAccessible = lesson.isFree || isEnrolled;
        const isCompleted = completedLessons.includes(lesson.id);
        const isCurrent = lesson.id === currentLessonId;

        return (
          <button
            key={lesson.id}
            onClick={() => isAccessible && onLessonClick?.(lesson.id)}
            disabled={!isAccessible}
            className={cn(
              'w-full flex items-center gap-3 rounded-lg p-3 text-left transition-colors',
              isAccessible
                ? 'hover:bg-muted cursor-pointer'
                : 'cursor-not-allowed opacity-60',
              isCurrent && 'bg-primary/10 border border-primary/20',
            )}
          >
            {/* Status Icon */}
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : isAccessible ? (
                <Play
                  className={cn('h-3.5 w-3.5', isCurrent ? 'fill-current' : '')}
                />
              ) : (
                <Lock className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Lesson Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-sm font-medium truncate',
                    isCurrent ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {index + 1}. {lesson.title}
                </span>

                {/* Show Preview badge ONLY if user isn't enrolled but lesson is free */}
                {lesson.isFree && !isEnrolled && (
                  <span className="shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Free
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{lesson.duration || '0'} min</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

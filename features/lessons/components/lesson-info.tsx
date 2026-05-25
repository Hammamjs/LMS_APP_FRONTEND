import { Button, Progress } from '@/shared/ui';
import { ChevronLeft, ChevronRight, PlayCircle, Sparkles } from 'lucide-react';
import { CompletedLessons } from './completed-lessons';
import { Lesson } from '../types/types';
import { RightCard } from './right-card';

type Props = {
  previousLesson: Lesson | null;
  currentLesson: Lesson;
  nextLesson: Lesson | null;
  completedLessons: string[];
  totalLessons: number;
  currentLessonIndex: number;
  progressPercentage: number;

  markComplete: () => void;
  navigateToLesson: (nextId: string) => void;
};

export const LessonInfo = ({
  currentLessonIndex,
  previousLesson,
  totalLessons,
  currentLesson,
  navigateToLesson,
  nextLesson,
  progressPercentage,
  completedLessons,
  markComplete,
}: Props) => {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
      {/* Left */}
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-pink-400">
            <Sparkles className="h-4 w-4" />

            <span className="text-sm font-medium">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            {currentLesson.title}
          </h1>

          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">
            Master this lesson and continue your learning journey with
            interactive, modern course content designed for high-quality
            learning experiences.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            disabled={!previousLesson}
            onClick={() =>
              previousLesson && navigateToLesson(previousLesson.id)
            }
            className="border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <CompletedLessons
            completedLessons={completedLessons}
            currentLesson={currentLesson}
            markComplete={markComplete}
          />

          <Button
            variant="outline"
            disabled={!nextLesson}
            onClick={() => nextLesson && navigateToLesson(nextLesson.id)}
            className="border-white/10 bg-white/5 backdrop-blur-xl"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* RIGHT CARD */}
      <RightCard progressPercentage={progressPercentage} />
    </div>
  );
};

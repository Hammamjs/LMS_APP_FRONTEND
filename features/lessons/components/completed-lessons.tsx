import { Button } from '@/shared/ui';
import { CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types/types';

type Props = {
  completedLessons: string[];
  currentLesson: Lesson;
  markComplete: () => void;
};

export const CompletedLessons = ({
  completedLessons,
  currentLesson,
  markComplete,
}: Props) => {
  return completedLessons.includes(currentLesson.id) ? (
    <Button disabled className="bg-emerald-500 text-white">
      <CheckCircle2 className="mr-2 h-4 w-4" />
      Completed
    </Button>
  ) : (
    <Button
      onClick={markComplete}
      className="bg-linear-to-r from-pink-500 to-violet-500 text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02]"
    >
      <CheckCircle2 className="mr-2 h-4 w-4" />
      Mark Complete
    </Button>
  );
};

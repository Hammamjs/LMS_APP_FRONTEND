import { Button, Progress } from '@/shared/ui';
import { ChevronLeft, Menu, X } from 'lucide-react';
import Link from 'next/link';

type Props = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
};

export const TopSidebar = ({
  completedLessons,
  courseId,
  percentage,
  setSidebarOpen,
  sidebarOpen,
  totalLessons,
}: Props) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        <Link
          href={`/courses/${courseId}`}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to Course
        </Link>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <div className="text-right">
          <p className="text-xs text-zinc-500">Progress</p>

          <p className="text-sm font-medium">
            {completedLessons}/{totalLessons} lessons
          </p>
        </div>

        <div className="w-40">
          <Progress value={percentage} className="h-2 bg-white/10" />
        </div>
      </div>
    </div>
  );
};

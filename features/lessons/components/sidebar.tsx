import { Button, ScrollArea } from '@/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { LessonList } from './lesson-list';
import { Lesson } from '../types/types';
import { cn } from '@/shared/lib';

type Props = {
  sidebarOpen: boolean;
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  lessonId: string;

  navigateToLesson: (lessonId: string) => void;
  handleCloseSidebar: () => void;
};

export const Sidebar = ({
  sidebarOpen,
  lessons,
  completedLessons,
  currentLessonId,
  lessonId,
  handleCloseSidebar,
  navigateToLesson,
}: Props) => {
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'absolute right-0 top-0 z-50 h-full w-95 border-l border-white/10 bg-[#0b0b0b]/90 backdrop-blur-2xl lg:relative',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <div>
              <h2 className="font-semibold">Course Content</h2>

              <p className="text-sm text-zinc-400">{lessons.length} lessons</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={handleCloseSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100%-64px)] px-3 py-4">
            <LessonList
              lessons={lessons}
              currentLessonId={currentLessonId}
              completedLessons={completedLessons}
              onLessonClick={(lessonId) => navigateToLesson(lessonId)}
            />
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

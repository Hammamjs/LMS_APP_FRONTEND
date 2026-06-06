'use client';

import { useState, useMemo } from 'react';
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { motion } from 'framer-motion';

import { VideoPlayer } from './video-player';

import { useGetCourseLessons } from '../hooks/use.get.course.lessons';
import { useGetCourseByIdQuery } from '../../courses/hooks/use.course-by-id';
import { TopSidebar } from '../../courses/components/top-sidebar';
import { LessonInfo } from './lesson-info';
import { Sidebar } from './sidebar';

export function WatchContent() {
  const { id } = useParams();

  const router = useRouter();
  const searchParams = useSearchParams();

  const { course, isLoading: isCourseLoading } = useGetCourseByIdQuery(
    id as string,
  );

  const { data, isLoading: isLessonsLoading } = useGetCourseLessons(
    id as string,
  );

  const lessons = data?.data ?? [];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessonIdFromUrl = searchParams.get('lesson');

  const currentLesson = useMemo(() => {
    if (lessonIdFromUrl) {
      const lesson = lessons.find((l: any) => l.id === lessonIdFromUrl);

      if (lesson) return lesson;
    }

    return lessons[0];
  }, [lessonIdFromUrl, lessons]);

  const currentLessonIndex = useMemo(
    () => lessons.findIndex((l: any) => l.id === currentLesson?.id),
    [lessons, currentLesson],
  );

  const previousLesson =
    currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

  const nextLesson =
    currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : null;

  const navigateToLesson = (lessonId: string) => {
    router.push(`/courses/${id}/watch?lesson=${lessonId}`);
  };

  const markComplete = () => {
    if (currentLesson && !completedLessons.includes(currentLesson.id)) {
      setCompletedLessons((prev) => [...prev, currentLesson.id]);
    }

    if (nextLesson) {
      navigateToLesson(nextLesson.id);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const progressPercentage =
    lessons.length > 0
      ? Math.round((completedLessons.length / lessons.length) * 100)
      : 0;

  if (isCourseLoading || isLessonsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
          }}
          className="h-14 w-14 rounded-full border-4 border-white/10 border-t-pink-500"
        />
      </div>
    );
  }

  if (!course || !lessons.length || !currentLesson) {
    return notFound();
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-125 w-125 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-125 w-125 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* TOP BAR */}
        <TopSidebar
          setSidebarOpen={setSidebarOpen}
          completedLessons={completedLessons.length}
          totalLessons={lessons.length}
          sidebarOpen={sidebarOpen}
          courseId={course.id}
          percentage={progressPercentage}
        />

        {/* VIDEO SECTION */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex max-w-425 flex-col gap-6 p-4 lg:p-8">
            {/* Player */}
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(255,0,128,0.12)] backdrop-blur-xl"
            >
              <VideoPlayer url={currentLesson.url ?? ''} />
            </motion.div>

            {/* Info */}
            <LessonInfo
              completedLessons={completedLessons}
              currentLesson={currentLesson}
              currentLessonIndex={currentLessonIndex}
              markComplete={markComplete}
              navigateToLesson={navigateToLesson}
              nextLesson={nextLesson}
              previousLesson={previousLesson}
              progressPercentage={progressPercentage}
              totalLessons={lessons.length}
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        completedLessons={completedLessons}
        currentLessonId={currentLesson.id}
        lessonId={nextLesson?.id ?? ''}
        lessons={lessons}
        navigateToLesson={navigateToLesson}
        handleCloseSidebar={handleCloseSidebar}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}

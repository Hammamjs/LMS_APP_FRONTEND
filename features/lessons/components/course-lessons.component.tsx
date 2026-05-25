'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useGetCourseLessons } from '../hooks/use.get.course.lessons';
import { DeleteLessonModal } from './delete-lesson.modal';
import { LessonsListSkeleton } from './course-lessons.skeleton';
import { useDeleteLessonSubmit } from '../hooks/use.lesson.delete';
import { Lesson } from '../types/types';

export function LessonsListComponent({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(
    undefined,
  );

  const { data: lessons, isLoading } = useGetCourseLessons(id);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenDelete = (lesson: Lesson | undefined) => {
    setShowModal(true);
    setSelectedLesson(lesson);
  };

  const { handleDeleteLesson, isLoading: isLessonDeleting } =
    useDeleteLessonSubmit({
      handleCloseModal,
    });

  if (isLoading) {
    return <LessonsListSkeleton />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Course Lessons</h1>

        <Button asChild>
          <Link href={`/lessons/add`}>Add Lesson</Link>
        </Button>
      </div>

      <div className="space-y-3">
        {lessons?.data.map((lesson) => (
          <Card key={lesson.id}>
            <CardContent className="flex items-center justify-between p-4">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-6">
                  {lesson.order}
                </span>

                <div>
                  <p className="font-medium">{lesson.title}</p>
                </div>
              </div>

              {/* Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/lessons/${lesson.id}/edit`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleOpenDelete(lesson)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
      {showModal && (
        <DeleteLessonModal
          hideModalHandler={() => setShowModal(false)}
          handleAction={() => {
            handleDeleteLesson(selectedLesson);
          }}
          isLoading={isLessonDeleting}
        />
      )}
    </div>
  );
}

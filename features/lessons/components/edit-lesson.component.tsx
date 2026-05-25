'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { ArrowLeft } from 'lucide-react';

import { Badge, Button } from '@/shared/ui';

import { useGetLessonById } from '../hooks/use.get-lesson-by-id';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';
import { EditLessonSkeleton } from './edit-lesson.skeleton';
import { useOnSubmitActions } from '../hooks/use.submit-actions';
import { DeleteLessonModal } from './delete-lesson.modal';
import { useDeleteLessonSubmit } from '../hooks/use.lesson.delete';
import { EditForm } from './edit-form';
import { HeaderOptions } from './header-options';

type EditLessonComponentProps = {
  id: string;
};

export function EditLessonComponent({ id }: EditLessonComponentProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TUpdateLessonSchema>();

  const { data: lesson, isLoading } = useGetLessonById(id);

  const { onSubmit, isLessonUpdating } = useOnSubmitActions({
    lesson,
    setValue,
  });

  const handleShowDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const { handleDeleteLesson, isLoading: isLessonDeleting } =
    useDeleteLessonSubmit({ handleCloseModal });

  useEffect(() => {
    if (!lesson) return;

    reset({
      title: lesson.title,
      url: lesson.url,
      description: lesson.description,
      isFree: lesson.isFree,
      duration: lesson.duration,
    });
  }, [lesson, reset]);

  if (isLoading) {
    return <EditLessonSkeleton />;
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* BACK */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/instructor/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to courses
          </Link>
        </Button>
      </div>

      {/* HEADER */}
      <HeaderOptions
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleShowDeleteModel={handleShowDeleteModal}
        isLoading={isLessonUpdating}
      />

      {/* STATUS */}
      <div className="flex items-center gap-2">
        <Badge variant={watch('isFree') ? 'default' : 'secondary'}>
          {watch('isFree') ? 'Free Lesson' : 'Premium Lesson'}
        </Badge>

        <span className="text-sm text-muted-foreground">Lesson ID: {id}</span>
      </div>

      {/* FORM */}
      <EditForm register={register} watch={watch} errors={errors} />

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <DeleteLessonModal
          hideModalHandler={() => setShowDeleteModal(false)}
          handleAction={() => {
            handleDeleteLesson(lesson);
          }}
          isLoading={isLessonDeleting}
        />
      )}
    </div>
  );
}

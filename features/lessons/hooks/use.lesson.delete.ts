import { useToast } from '@/shared/hooks';
import { Lesson } from '../types/types';
import { useLessonDeleteAction } from './use.lesson-delete-action';

export const useDeleteLessonSubmit = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { deleteLesson, isLoading } = useLessonDeleteAction();
  const { toast } = useToast();

  const handleDeleteLesson = async (lesson?: Lesson) => {
    if (!lesson) return;
    try {
      await deleteLesson({ id: lesson.id, courseId: lesson.courseId });
      toast({ title: 'Lesson Deleted' });
    } catch (err) {
      console.log(err);
      toast({ title: 'Lesson failed to deleted' });
    }

    handleCloseModal();
  };

  return {
    handleDeleteLesson,
    isLoading,
  };
};

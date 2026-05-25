import { UseFormRegister } from 'react-hook-form';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';
import { Label } from '@/shared/ui';

type Props = {
  register: UseFormRegister<TUpdateLessonSchema>;
};

export const FreeLesson = ({ register }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <input
        id="isFree"
        type="checkbox"
        className="h-4 w-4"
        {...register('isFree')}
      />

      <div>
        <Label htmlFor="isFree">Free Lesson</Label>

        <p className="text-sm text-muted-foreground">
          Allow students to preview this lesson for free.
        </p>
      </div>
    </div>
  );
};

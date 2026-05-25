import { Label, Textarea } from '@/shared/ui';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';

type Props = {
  register: UseFormRegister<TUpdateLessonSchema>;
  errors: FieldErrors<TUpdateLessonSchema>;
};

export const Description = ({ errors, register }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>

      <Textarea
        id="description"
        rows={5}
        placeholder="Enter lesson description"
        {...register('description', {
          required: 'Description is required',
        })}
      />

      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};

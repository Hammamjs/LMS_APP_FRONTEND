import { Input, Label } from '@/shared/ui';
import { UseFormRegister } from 'react-hook-form';
import { TAddLessonSchema } from '../schema/add-lesson.schema';

type Props = {
  register: UseFormRegister<TAddLessonSchema>;
};

export const Duration = ({ register }: Props) => {
  return (
    <div className="grid gap-1 sm:grid-cols-1">
      {/* DURATION */}
      <div className="space-y-2">
        <Label>Duration</Label>
        <div className="space-y-1">
          <Input
            type="number"
            min={0}
            max={59}
            placeholder="00"
            {...register('duration', {
              valueAsNumber: true,
            })}
          />

          <p className="text-center text-xs text-muted-foreground">Minutes</p>
        </div>
      </div>
    </div>
  );
};

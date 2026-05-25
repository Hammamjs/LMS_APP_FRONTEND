import { Input, Label } from '@/shared/ui';
import { UseFormRegister } from 'react-hook-form';
import { TCreateCourseSchema } from '../schema/create.course.schema';

type Props = {
  register: UseFormRegister<TCreateCourseSchema>;
};

export const CourseDuration = ({ register }: Props) => {
  return (
    <>
      <Label>Duration</Label>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Input
            type="number"
            min={0}
            placeholder="00"
            {...register('hours', {
              valueAsNumber: true,
            })}
          />

          <p className="text-center text-xs text-muted-foreground">Hours</p>
        </div>

        <div className="space-y-1">
          <Input
            type="number"
            min={0}
            max={59}
            placeholder="00"
            {...register('minutes', {
              valueAsNumber: true,
            })}
          />

          <p className="text-center text-xs text-muted-foreground">Minutes</p>
        </div>

        <div className="space-y-1">
          <Input
            type="number"
            min={0}
            max={59}
            placeholder="00"
            {...register('seconds', {
              valueAsNumber: true,
            })}
          />

          <p className="text-center text-xs text-muted-foreground">Seconds</p>
        </div>
      </div>
    </>
  );
};

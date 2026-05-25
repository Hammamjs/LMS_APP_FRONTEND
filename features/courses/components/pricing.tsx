import { Card, CardContent, Input, Label } from '@/shared/ui';
import { CourseDuration } from './course.duration';
import { UseFormRegister } from 'react-hook-form';
import { TCreateCourseSchema } from '../schema/create.course.schema';

type PricingProps = {
  register: UseFormRegister<TCreateCourseSchema>;
};

export const Pricing = ({ register }: PricingProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <Label>Original price</Label>

          <Input
            type="number"
            placeholder="199"
            {...register('originalPrice', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <Label>Discount price</Label>

          <Input
            type="number"
            placeholder="79"
            {...register('discountPrice', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <CourseDuration register={register} />
        </div>

        <div className="space-y-2">
          <Label>Language</Label>

          <Input placeholder="English" {...register('language')} />
        </div>
      </CardContent>
    </Card>
  );
};

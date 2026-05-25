import {
  Card,
  CardContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';
import { CourseCategory } from './course-category';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { TCreateCourseSchema } from '../schema/create.course.schema';

type BasicInforProps = {
  register: UseFormRegister<TCreateCourseSchema>;
  control: Control<TCreateCourseSchema>;
};

export const BasicInfo = ({ register, control }: BasicInforProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <Label>Course title</Label>

          <Input placeholder="Advanced React Patterns" {...register('title')} />
        </div>

        <div className="space-y-2">
          <Label>Subtitle</Label>

          <Input
            placeholder="Master scalable architecture and performance"
            {...register('subtitle')}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>

          <Textarea
            rows={7}
            placeholder="Describe your course..."
            {...register('description')}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <CourseCategory control={control} />
          </div>

          <div className="space-y-2">
            <Label>Level</Label>

            <Controller
              control={control}
              name="level"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>

                    <SelectItem value="Intermediate">Intermediate</SelectItem>

                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

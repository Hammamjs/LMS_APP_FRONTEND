import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { Control, Controller } from 'react-hook-form';
import { TCreateCourseSchema } from '../schema/create.course.schema';

type Props = {
  control: Control<TCreateCourseSchema>;
};

export const CourseCategory = ({ control }: Props) => {
  return (
    <>
      <Label>Category</Label>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="development">Development</SelectItem>

              <SelectItem value="design">Design</SelectItem>

              <SelectItem value="business">Business</SelectItem>

              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </>
  );
};

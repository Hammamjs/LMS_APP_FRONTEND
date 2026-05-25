import { Control, Controller, UseFormRegister } from 'react-hook-form';
import { TAddLessonSchema } from '../schema/add-lesson.schema';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { Course } from '@/features/courses';

type Props = {
  control: Control<TAddLessonSchema>;
  courses: Course[];
};

export const SelectCourse = ({ control, courses }: Props) => {
  return (
    <>
      <Label>Course</Label>

      <Controller
        name="courseId"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>

            <SelectContent>
              {courses?.map((c) => (
                <SelectItem value={c.id} key={c.id}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </>
  );
};

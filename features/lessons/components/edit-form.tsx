import {
  FieldErrors,
  UseFormRegister,
  WatchDefaultValue,
} from 'react-hook-form';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';
import { FreeLesson } from './free-lesson';
import { Card, CardContent, Input, Label } from '@/shared/ui';
import { LivePreview } from './live-preview';
import { Description } from './description';

type Props = {
  register: UseFormRegister<TUpdateLessonSchema>;
  errors: FieldErrors<TUpdateLessonSchema>;
  watch: WatchDefaultValue<string>;
};

export const EditForm = ({ register, errors, watch }: Props) => {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {/* TITLE */}
        <div className="space-y-2">
          <Label htmlFor="title">Lesson Title</Label>

          <Input
            id="title"
            placeholder="Enter lesson title"
            {...register('title', {
              required: 'Title is required',
            })}
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <Description register={register} errors={errors} />

        {/* VIDEO URL */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Video URL</Label>

            <Input
              id="url"
              placeholder="https://youtube.com/watch?v=..."
              {...register('url', {
                required: 'Video URL is required',
              })}
            />

            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>

          {/* LIVE PREVIEW */}
          <LivePreview url={watch('url')} />
        </div>

        {/* GRID */}
        <div className="grid gap-1 md:grid-cols-1">
          {/* DURATION */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>

            <Input
              id="duration"
              type="number"
              {...register('duration', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* FREE LESSON */}
        <FreeLesson register={register} />
      </CardContent>
    </Card>
  );
};

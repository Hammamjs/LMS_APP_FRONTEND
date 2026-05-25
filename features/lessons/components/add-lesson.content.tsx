'use client';

import { ArrowLeft, Save } from 'lucide-react';
import { Textarea, Button, Card, CardContent, Input, Label } from '@/shared/ui';
import { Duration } from './duration';
import { LessonSettings } from './lesson.settings';
import { VideoPreview } from './video-preview';
import { useForm } from 'react-hook-form';
import { TAddLessonSchema } from '../schema/add-lesson.schema';
import { useEffect } from 'react';
import { SelectCourse } from './select-course';
import { useLessonContext } from '../hooks/use.lesson.context';
import { Course } from '@/features/courses/types';
import { useRouter } from 'next/navigation';
import { useOnSubmitLesson } from '../hooks/use.on-submit-lesson';

export function NewLessonContent({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const { url } = useLessonContext();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<TAddLessonSchema>({
    defaultValues: {
      courseId: '',
      description: '',
      duration: 0,
      isFree: false,
      url: '',
      title: '',
    },
  });

  useEffect(() => {
    if (url) setValue('url', url);
  }, [url, setValue]);

  const { onSubmit, isLoading } = useOnSubmitLesson();

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* BACK */}
      <div className="mb-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <p className="flex">
            <ArrowLeft className="h-4 w-4" />
            Back to previous
          </p>
        </Button>
      </div>

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Add new lesson
          </h1>

          <p className="text-muted-foreground">
            Create a lesson with video, description and resources.
          </p>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={!isLoading ? 'opacity-100' : 'opacity-50'}
        >
          <Save className="h-4 w-4" />
          Publish
        </Button>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-5 p-6">
              {/* COURSE */}
              <div className="space-y-2">
                <SelectCourse control={control} courses={courses ?? []} />
              </div>
              {/* TITLE */}
              <div className="space-y-2">
                <Label htmlFor="ltitle">Lesson title</Label>

                <Input
                  id="ltitle"
                  placeholder="e.g. Understanding the render lifecycle"
                  {...register('title')}
                  aria-invalid={!!errors.title}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label htmlFor="ldesc">Description</Label>

                <Textarea
                  id="ldesc"
                  rows={5}
                  placeholder="What will students learn in this lesson?"
                  {...register('description')}
                  aria-invalid={!!errors.description}
                />
              </div>

              {/* VIDEO */}
              <VideoPreview />
              {/* EXTRA */}
              <Duration register={register} />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* SETTINGS */}
          <LessonSettings isFree={watch('isFree')} setValue={setValue} />
        </div>
      </div>
    </div>
  );
}

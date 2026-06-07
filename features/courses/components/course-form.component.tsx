'use client';

import Link from 'next/link';

import { ArrowLeft, Save } from 'lucide-react';

import { Button, Card } from '@/shared/ui';
import { CourseSettings } from './course.settings';
import { CourseRequirements } from './course-requirements';
import { BasicInfo } from './course-basic-info';
import { Learning } from './learning';
import { Audience } from './audience';
import { ImagePreview } from './image-preview';
import { useImagePreview } from '../hooks/use.image-preview';
import { Pricing } from './pricing';
import { useForm } from 'react-hook-form';
import {
  EMPTY_DEFAULTS,
  TCreateCourseSchema,
} from '../schema/create.course.schema';
import { Course } from '../types/course.types';
import { useEffect, useState } from 'react';
import { mapCourseToForm } from '../lib/course.mapper';
import { useCourseSubmit } from '../hooks/use.course-submit';
import { useFormArrayActions } from '../hooks/use.form-array.actions';

type CourseFormMode = 'create' | 'edit';
type Props = {
  mode: CourseFormMode;
  course?: Course;
};

export function CourseFormComponent({ mode, course }: Props) {
  const {
    file,
    imageMode,
    imageUrl,
    preview,
    setFile,
    setImageMode,
    setImageUrl,
  } = useImagePreview();

  const isEdit = mode == 'edit';

  const [requirementInput, setRequirementInput] = useState<string>('');

  const [learnInput, setLearnInput] = useState('');

  const [audienceInput, setAudienceInput] = useState('');

  const { register, control, getValues, setValue, watch, handleSubmit, reset } =
    useForm<TCreateCourseSchema>({
      defaultValues: EMPTY_DEFAULTS,
    });

  const { onAddItem, onRemoveItem } = useFormArrayActions({
    getValues,
    setValue,
  });

  const { onSubmit, isLoading } = useCourseSubmit({
    course,
    isEdit,
    imageUrl,
  });

  useEffect(() => {
    if (imageMode == 'url') setValue('image', imageUrl);
  }, [file, imageUrl, imageMode, setValue]);

  useEffect(() => {
    if (isEdit && course) {
      reset(mapCourseToForm(course));
      setImageUrl(course.image);
    }
  }, [course, reset, isEdit]);

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* BACK */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/instructor/courses">
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </Link>
      </Button>

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {isEdit ? 'Update course' : 'Create new course'}
          </h1>

          <p className="text-muted-foreground">
            Build a professional course with pricing, requirements and learning
            outcomes.
          </p>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={isLoading ? 'opacity-50' : 'opacity-100'}
        >
          <Save className="h-4 w-4" />
          {isEdit ? 'Update course' : 'Publish course'}
        </Button>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* BASIC INFO */}
          <BasicInfo register={register} control={control} />
          {/* REQUIREMENTS */}
          <CourseRequirements
            onAddRequirement={onAddItem('requirements')}
            requirements={watch('requirements')}
            requirementInput={requirementInput}
            onRemoveItem={onRemoveItem('requirements')}
            setRequirementInput={setRequirementInput}
          />
          LEARNING
          <Learning
            learnInput={learnInput}
            learnItems={watch('whatYouLearn')}
            onAddItem={onAddItem('whatYouLearn')}
            onRemoveItem={onRemoveItem('whatYouLearn')}
            setLearnInput={setLearnInput}
          />
          {/* AUDIENCE */}
          <Audience
            audienceInput={audienceInput}
            onAddAudience={onAddItem('targetAudience')}
            onRemoveAudience={onRemoveItem('targetAudience')}
            setAudienceInput={setAudienceInput}
            targetAudience={watch('targetAudience')}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* IMAGE */}
          <ImagePreview
            imageMode={imageMode}
            imageUrl={imageUrl}
            preview={preview}
            setFile={setFile}
            setImageMode={setImageMode}
            setImageUrl={setImageUrl}
          />

          {/* PRICING */}
          <Pricing register={register} />

          {/* SETTINGS */}
          <Card>
            <CourseSettings />
          </Card>
        </div>
      </div>
    </div>
  );
}

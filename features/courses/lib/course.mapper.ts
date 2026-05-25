import { convertTime } from '@/features/lessons/lib/convert-time.helper';
import { TCreateCourseSchema } from '../schema/create.course.schema';
import { Course } from '../types/course.types';

export function mapCourseToForm(course: Course): TCreateCourseSchema {
  const { hours, minutes, seconds } = convertTime(course.duration);
  return {
    title: course.title,
    description: course.description,
    image: course.image,
    hours,
    minutes,
    seconds,
    requirements: course.requirements ?? [],
    whatYouLearn: course.whatYouLearn ?? [],
    targetAudience: course.targetAudience ?? [],
    level: course.level,
    category: course.category,
    language: course.language,
    subtitle: course.subtitle,
    discountPrice: course.discountPrice,
    originalPrice: course.originalPrice,
  };
}

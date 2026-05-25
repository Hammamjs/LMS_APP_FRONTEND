import { EnrolledCourse } from '@/features/courses/types';
import { CompletedCourseCard } from './completed-course-card';

type Props = {
  completedCourses: EnrolledCourse[];
};

export const CompletedCoursesList = ({ completedCourses }: Props) => {
  return completedCourses.map((enroll) => (
    <CompletedCourseCard enroll={enroll} key={enroll.id} />
  ));
};

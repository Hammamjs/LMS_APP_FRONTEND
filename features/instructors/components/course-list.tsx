import { Course } from '@/features/courses/types';
import CourseCardInstructor from './course-card.instructor';

type Props = { courses: Course[] };

export const CourseList = ({ courses }: Props) => {
  return courses.map((c) => <CourseCardInstructor course={c} key={c.id} />);
};

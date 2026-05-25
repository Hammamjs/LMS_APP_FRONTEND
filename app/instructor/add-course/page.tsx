import { NewCourseComponent } from '@/features/courses/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Course — LearnHub',
  description: 'Create and publish a new course.',
};

export default function NewCoursePage() {
  return <NewCourseComponent />;
}

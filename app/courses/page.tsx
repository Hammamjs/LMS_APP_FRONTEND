import { CoursesComponent } from '@/features/courses/components';

export const metadata = {
  title: 'Explore Online Courses & Programs | Learn-hub',
  alternatives: {
    canonical: '/courses',
  },
  description:
    'Browse our comprehensive catalog of professional online courses. Learn web development, design, marketing, and business from industry expert instructors.',
};

export default function CoursesPage() {
  return <CoursesComponent />;
}

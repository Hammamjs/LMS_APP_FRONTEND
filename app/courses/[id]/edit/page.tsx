import { EditCourseComponent } from '@/features/courses/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Course — LearnHub',
  description: 'Update your course details and settings.',
};

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditCourseComponent id={id} />;
}

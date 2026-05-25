import { EditLessonComponent } from '@/features/lessons/components';

export const metadata = {
  title: 'Edit Lesson — LearnHub',
  description: 'Update lesson details, video and resources.',
};

type Props = {
  params: Promise<{ lessonId: string }>;
};

export default async function EditLessonPage({ params }: Props) {
  const { lessonId } = await params;
  return <EditLessonComponent id={lessonId} />;
}

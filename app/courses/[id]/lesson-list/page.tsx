import { LessonsListComponent } from '@/features/lessons/components';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function LessonListPage({ params }: Props) {
  const { id } = await params;
  return <LessonsListComponent id={id} />;
}

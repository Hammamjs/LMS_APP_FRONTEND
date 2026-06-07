import { CourseDetailsComponent } from '@/features/courses/components';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

// we need to fetch lesson details *** enhancing SEO ***
async function getCourse(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
    {
      cache: 'no-store',
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    console.error(
      `[Next.js SSG Error]: Failed fetching course "${id}". Server responded with code: ${res.status}`,
    );
    throw new Error(`Failed to fetch course: Status ${res.status}`);
  }
  const jsonResponse = await res.json();

  return await jsonResponse.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  return {
    title: `${course.title} | Learn-hub`,
    description: course.description?.slice(0, 160) || 'Learn with this course.',
    keywords: [course.title, course.category, 'online course', 'education'],
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params;
  return <CourseDetailsComponent id={id} />;
}

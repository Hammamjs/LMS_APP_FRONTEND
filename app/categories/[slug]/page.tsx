import { CategoryCoursesBySlugComponent } from '@/features/categories/components';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getCategory() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/categories`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!response.ok) {
    console.error(
      `[Next.js SSG Error]: Failed fetching slug. Server responded with code: ${response.status}`,
    );
    throw new Error(`Failed to fetch course: Status ${response.status}`);
  }

  const jsonResponse = await response.json();

  return jsonResponse;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const categories = await getCategory();

  const category = categories.data.map((c: string) => c == slug);

  return {
    title: `${category} | Learn-hub`,
    description: category || 'Learn with this category.',
    keywords: [category],
  };
}

export default async function CategoriesCoursePage({ params }: Props) {
  const { slug } = await params;
  return <CategoryCoursesBySlugComponent slug={slug} />;
}

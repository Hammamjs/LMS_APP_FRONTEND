'use client';

import { useCourseCategoriesQuery } from '@/features/courses/api/courses.api';
import { useRouter } from 'next/navigation';
import { CategoriesSkeleton } from './categories.skeletion';
import { HeroSection } from './hero.section';
import { CategoriesList } from './categories-list';
import { Stats } from './stat-section';
import useCourseResult from '@/features/courses/hooks/use.get.courses';

export function CategoriesComponent() {
  const { data: categories, isLoading } = useCourseCategoriesQuery();
  const { courses, isLoading: isCourseLoading } = useCourseResult({ page: 1 });
  const router = useRouter();

  if (isLoading || isCourseLoading) return <CategoriesSkeleton />;

  if (!categories?.length) {
    router.push('/');
    return;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CategoriesList categories={categories} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats
        categoriesLength={categories.length}
        coursesLength={courses?.length ?? 0}
      />
    </div>
  );
}

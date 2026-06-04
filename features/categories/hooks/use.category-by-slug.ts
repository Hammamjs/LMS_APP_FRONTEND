import { useCourseCategoriesQuery } from '@/features/courses/api/courses.api';
import { useGetCourses } from '@/features/courses/hooks';
import { Level } from '@/features/courses/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useMemo, useState } from 'react';
import { categoryIcons } from '../config/category.config';
import { Code } from 'lucide-react';
import { calcDiscount } from '@/features/courses/lib';
import { convertSlugHelper } from '../lib/convert-to-slug.helper';

type Props = {
  slug: string;
};

export const useCategoryBySlug = ({ slug }: Props) => {
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(
    undefined,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const debounceValue = useDebounce(searchQuery);

  const convertSlug = convertSlugHelper(slug);

  const { data: categories, isLoading } = useCourseCategoriesQuery();
  const { courses, isLoading: isCourseLoading } = useGetCourses({
    page: 1,
    category: convertSlug,
    level: selectedLevel as Level,
    search: debounceValue,
  });

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const Icon = categoryIcons[slug as string] || Code;

  const filteredCourses = useMemo(() => {
    let result = courses ?? [];

    // Price filter
    if (selectedPrice) {
      if (selectedPrice === 'free') {
        result = result.filter((course) => {
          const finalPrice = calcDiscount(
            course.originalPrice,
            course.discountPrice,
          );

          return finalPrice === 0;
        });
      } else if (selectedPrice === 'paid') {
        result = result.filter((course) => {
          const finalPrice = calcDiscount(
            course.originalPrice,
            course.discountPrice,
          );

          return finalPrice > 0;
        });
      }
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) =>
          b.updatedAt.toISOString().localeCompare(a.updatedAt.toISOString()),
        );
        break;
      case 'price-low':
        result.sort((a, b) => a.originalPrice - b.originalPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      default: // popular
      // result.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    return result;
  }, [
    convertSlug,
    searchQuery,
    selectedLevel,
    selectedPrice,
    sortBy,
    isCourseLoading,
    courses,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(undefined);
    setSelectedPrice(null);
  };

  return {
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedPrice,
    setSelectedPrice,
    viewMode,
    setViewMode,
    Icon,
    filteredCourses,
    categories,
    isLoading,
    isCourseLoading,
    courses,
    convertSlug,
    clearFilters,
  };
};

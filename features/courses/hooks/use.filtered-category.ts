import { useMemo } from 'react';
import useCourseResult from './use.get.courses';

type Props = {
  searchQuery: string;
  selectedCategory: string | null;
  selectedLevel: string | null;
  selectedPrice: string | null;
  sortBy: string;
  page: number;
};

const useFilteredCategories = ({
  searchQuery,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  sortBy,
  page,
}: Props) => {
  const { courses, isLoading, isFetching } = useCourseResult({
    page,
    category: selectedCategory ?? '',
  });

  const filteredCourses = useMemo(() => {
    let result = [...(courses ?? [])];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.instructor.username.toLowerCase().includes(query),
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((course) => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel) {
      result = result.filter((course) => course.level === selectedLevel);
    }

    // Price filter
    if (selectedPrice) {
      if (selectedPrice === 'free') {
        result = result.filter((course) => course.originalPrice == 0);
      } else if (selectedPrice === 'paid') {
        result = result.filter((course) => course.originalPrice > 0);
      }
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) =>
          b.createdAt.toString().localeCompare(a.createdAt.toString()),
        );
        break;
      case 'price-low':
        result.sort((a, b) => {
          const priceA =
            a.discountPrice > 0 ? a.discountPrice : a.originalPrice;

          const priceB =
            b.discountPrice > 0 ? b.discountPrice : b.originalPrice;

          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      // default: // popular
      //   result.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedPrice,
    sortBy,
    isLoading,
    courses,
  ]);

  return {
    isFetching,
    filteredCourses,
  };
};

export default useFilteredCategories;

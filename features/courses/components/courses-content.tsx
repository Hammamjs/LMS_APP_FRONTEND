'use client';

import { useEffect, useState } from 'react';
import { CourseFilters, ActiveFilters } from './course-filters';
import useFilteredCategories from '../hooks/use.filtered-category';
import useUi from '../hooks/use.ui';
import useUrlParams from '../hooks/use.url-params';
import { CoursesToolbar } from './courses-toolbar';
import CoursesResult from './courses-result';
import useCourseResult from '../hooks/use.get.courses';
import { useInView } from '../hooks/use.in-view';
import { CourseCardSkeleton } from './course.card-skeletion';
import { CoursesPageSkeleton } from './courses.skeletion';
import { useScrollEffect } from '../hooks/use.scroll-effect';

export function CoursesContent() {
  const [page, setPage] = useState(1);

  const { initialCategory, initialQuery } = useUrlParams();
  const { ref, inView } = useInView();

  const {
    clearAllFilters,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedPrice,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLevel,
    setSelectedPrice,
    setSortBy,
    sortBy,
  } = useUi({ initialQuery, initialCategory });

  // use filter hook
  const { filteredCourses, isFetching: isCoursesRefetching } =
    useFilteredCategories({
      searchQuery,
      selectedCategory,
      selectedLevel,
      selectedPrice,
      sortBy,
      page,
    });

  const { coursesLength, meta, isFetching, isLoading } = useCourseResult({
    page,
  });

  useScrollEffect({
    inView,
    hasNext: meta?.hasNext,
    isFetching,
    isLoading,
    setPage,
  });

  // if user change filter courses we need to reset it
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedLevel, selectedPrice, searchQuery, sortBy]);

  if (isLoading) return <CoursesPageSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All Courses
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore our catalog of {coursesLength}+ expert-led courses
        </p>
      </div>

      {/* Search and Sort Bar */}
      <CoursesToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      {/* Active Filters */}
      <div className="mb-6">
        <ActiveFilters
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          selectedPrice={selectedPrice}
          onCategoryChange={setSelectedCategory}
          onLevelChange={setSelectedLevel}
          onPriceChange={setSelectedPrice}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <CourseFilters
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          selectedPrice={selectedPrice}
          onCategoryChange={setSelectedCategory}
          onLevelChange={setSelectedLevel}
          onPriceChange={setSelectedPrice}
          onClearAll={clearAllFilters}
        />

        {/* Course Grid */}

        {isCoursesRefetching ? (
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <CoursesResult
            clearAllFilters={clearAllFilters}
            filteredCourses={filteredCourses}
          />
        )}
      </div>
      <div
        ref={ref}
        className="h-20 w-full flex items-center justify-center flex-wrap"
      >
        {isFetching && (
          <p className="flex space-x-5">
            <div
              className="inline-block animate-spin rounded-full border-4 border-muted border-t-primary"
              style={{
                width: 20,
                height: 20,
              }}
            />
          </p>
        )}
      </div>
    </div>
  );
}

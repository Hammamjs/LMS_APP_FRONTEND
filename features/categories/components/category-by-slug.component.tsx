'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { categoryDescriptions, sortOptions } from '../config/category.config';

import { CategoryCoursesBySlugSkeleton } from './category-by-slug.skeletion';
import { useCategoryBySlug } from '../hooks/use.category-by-slug';
import { CourseView } from './course.list';
import { ActiveCategoryFilters } from './active-category-filters';
import { PriceFilters } from './price-filters';
import { BrowseOtherCategories } from './browse-other-cat';
import { ViewModeToggle } from './view-mode-toggle';

type Props = {
  slug: string;
};

export function CategoryCoursesBySlugComponent({ slug }: Props) {
  const {
    Icon,
    categories,
    filteredCourses,
    isCourseLoading,
    isLoading,
    searchQuery,
    selectedLevel,
    selectedPrice,
    setSearchQuery,
    setSelectedLevel,
    setSelectedPrice,
    setSortBy,
    setViewMode,
    sortBy,
    viewMode,
    courses,
    convertSlug,
    clearFilters,
  } = useCategoryBySlug({ slug });

  if (isLoading || isCourseLoading) return <CategoryCoursesBySlugSkeleton />;

  if (!courses) {
    notFound();
  }

  if (!categories?.data.length) return;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-linear-to-b from-muted/50 to-background py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            href="/categories"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Categories
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {convertSlug}
                </h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {categoryDescriptions[convertSlug]}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {courses.length}
                </div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Courses */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${convertSlug}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Level Filter */}
              <Select
                value={selectedLevel || 'all'}
                onValueChange={(v) =>
                  setSelectedLevel(v === 'all' ? undefined : v)
                }
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <PriceFilters
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <ViewModeToggle setViewMode={setViewMode} viewMode={viewMode} />
            </div>
          </div>

          {/* Active Filters */}
          <ActiveCategoryFilters
            onClear={clearFilters}
            searchQuery={searchQuery}
            selectedLevel={selectedLevel}
            selectedPrice={selectedPrice}
            setSearchQuery={setSearchQuery}
            setSelectedLevel={setSelectedLevel}
            setSelectedPrice={setSelectedPrice}
          />

          {/* Course Grid/List */}
          <CourseView
            filteredCourses={filteredCourses}
            onClear={clearFilters}
            viewMode={viewMode}
          />

          {/* Browse Other Categories */}
          <BrowseOtherCategories
            categories={categories.data ?? []}
            slug={convertSlug}
          />
        </div>
      </section>
    </div>
  );
}

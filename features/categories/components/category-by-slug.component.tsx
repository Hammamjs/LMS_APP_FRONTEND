'use client';

import { useMemo, useState, use } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Code,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from 'lucide-react';
import {
  Input,
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { CourseCard } from '@/features/courses';
import {
  categoryDescriptions,
  categoryIcons,
  sortOptions,
} from '../config/category.config';
import { useCourseCategoriesQuery } from '@/features/courses/api/courses.api';
import { calcDiscount } from '@/features/courses/lib/calc-price';
import useCourseResult from '@/features/courses/hooks/use.get.courses';
import { CategoryCoursesBySlugSkeleton } from './category-by-slug.skeletion';

export function CategoryCoursesBySlugComponent() {
  const { slug } = useParams();

  const convertSlug = ((slug as string) ?? '')
    .split('-')
    .map((w) => w.at(0)?.toUpperCase() + w.slice(1))
    .join(' ');

  const { data: categories, isLoading } = useCourseCategoriesQuery();
  const { courses, isLoading: isCourseLoading } = useCourseResult({
    page: 1,
    category: convertSlug,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const Icon = categoryIcons[slug as string] || Code;

  const filteredCourses = useMemo(() => {
    let result = courses ?? [];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.username.toLowerCase().includes(query),
      );
    }

    // Level filter
    if (selectedLevel) {
      result = result.filter((course) => course.level === selectedLevel);
    }

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

  if (isLoading || isCourseLoading) return <CategoryCoursesBySlugSkeleton />;

  if (!courses) {
    notFound();
  }

  if (!categories?.length) return;

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
              <div className="text-center">
                {/* <div className="text-2xl font-bold text-foreground">
                  {freeCourses(allCourses, convertSlug)}
                </div> */}
                <div className="text-sm text-muted-foreground">Free</div>
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
                onValueChange={(v) => setSelectedLevel(v === 'all' ? null : v)}
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
              <Select
                value={selectedPrice || 'all'}
                onValueChange={(v) => setSelectedPrice(v === 'all' ? null : v)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

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
              <div className="hidden sm:flex items-center gap-1 rounded-md border border-border p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedLevel || selectedPrice || searchQuery) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-1 hover:text-destructive"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  {selectedLevel}
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className="ml-1 hover:text-destructive"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              {selectedPrice && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  {selectedPrice}
                  <button
                    onClick={() => setSelectedPrice(null)}
                    className="ml-1 hover:text-destructive"
                  >
                    &times;
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel(null);
                  setSelectedPrice(null);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Results Count */}
          {/* <p className="mb-6 text-sm text-muted-foreground">
            Showing {filteredCourses.length} of{' '}
            {totalCourses(allCourses, convertSlug)} courses in {convertSlug}
          </p> */}

          {/* Course Grid/List */}
          {filteredCourses.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <div className="mb-4 rounded-full bg-muted p-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No courses found</h3>
              <p className="mb-4 text-center text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel(null);
                  setSelectedPrice(null);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* Browse Other Categories */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Explore Other Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories
                .filter((cat) => cat !== convertSlug)
                .map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {cat}
                    </Badge>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { X } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { CourseFiltersProps } from '../types/course.types';
import DesktopFilter from './desktop-filter';
import MobileFilters from './mobile-filters';

export function CourseFilters(props: CourseFiltersProps) {
  const activeFilters = [
    props.selectedCategory,
    props.selectedLevel,
    props.selectedPrice,
  ].filter(Boolean).length;

  return (
    <>
      {/* Desktop Filters */}
      <DesktopFilter activeFilters={activeFilters} {...props} />

      {/* Mobile Filter Sheet */}
      <MobileFilters activeFilters={activeFilters} {...props} />
    </>
  );
}

export function ActiveFilters({
  selectedCategory,
  selectedLevel,
  selectedPrice,
  onCategoryChange,
  onLevelChange,
  onPriceChange,
}: CourseFiltersProps) {
  const hasFilters = selectedCategory || selectedLevel || selectedPrice;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {selectedCategory && (
        <Badge variant="secondary" className="gap-1">
          {selectedCategory}
          <button
            onClick={() => onCategoryChange(null)}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {selectedLevel && (
        <Badge variant="secondary" className="gap-1 capitalize">
          {selectedLevel}
          <button
            onClick={() => onLevelChange(null)}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {selectedPrice && (
        <Badge variant="secondary" className="gap-1 capitalize">
          {selectedPrice}
          <button
            onClick={() => onPriceChange(null)}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}

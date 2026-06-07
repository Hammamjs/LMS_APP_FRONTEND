import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import FilterContent from './filter-content';
import { CourseFiltersProps } from '../types/course.types';

type MobileFiltersProps = {
  activeFilters: number;
} & CourseFiltersProps;

const MobileFilters = ({ activeFilters, ...props }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="block md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 rounded-full px-1.5 py-0.5 text-xs"
              >
                {activeFilters}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              {activeFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={props.onClearAll}
                  className="h-auto px-2 py-1 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
            <SheetDescription className="sr-only">
              Narrow down courses by category, level, and price.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;

import { Button } from '@/shared/ui';
import { CourseFiltersProps } from '../types/course.types';
import FilterContent from './filter-content';

type DesktopFilterProps = CourseFiltersProps & {
  activeFilters: number;
  onClearAll: () => void;
};

const DesktopFilter = ({ activeFilters, ...props }: DesktopFilterProps) => {
  return (
    <div className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
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
        <FilterContent {...props} />
      </div>
    </div>
  );
};

export default DesktopFilter;

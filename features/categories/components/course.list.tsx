import { CourseCard } from '@/features/courses/components';
import { Course } from '@/features/courses/types';
import { Button } from '@/shared/ui';
import { Search } from 'lucide-react';

type Props = {
  filteredCourses: Course[];
  viewMode: 'grid' | 'list';

  onClear: () => void;
};

export const CourseView = ({ filteredCourses, onClear, viewMode }: Props) => {
  return filteredCourses.length > 0 ? (
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
      <Button variant="outline" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
};

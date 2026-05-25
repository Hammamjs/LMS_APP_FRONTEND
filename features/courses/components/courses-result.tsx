import { Button } from '@/shared/ui';
import { Search } from 'lucide-react';
import { CourseCard } from './course-card';
import { Course } from '../types/course.types';

type CoursesResultProps = {
  filteredCourses: Course[];
  clearAllFilters: () => void;
};

const CoursesResult = ({
  filteredCourses,
  clearAllFilters,
}: CoursesResultProps) => {
  return (
    <div className="flex-1">
      {/* Results Count */}
      <p className="mb-4 text-sm text-muted-foreground">
        Showing {filteredCourses.length}{' '}
        {filteredCourses.length === 1 ? 'course' : 'courses'}
      </p>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
          <Button variant="outline" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CoursesResult;

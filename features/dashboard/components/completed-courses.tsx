import { Course, EnrolledCourse } from '@/features/courses/types';
import { CompletedCoursesList } from './completed-courses.list';

type CompletedLessonProps = {
  completedCourses: EnrolledCourse[];
  courses: Course[];
};

const CompletedCourses = ({
  courses,
  completedCourses,
}: CompletedLessonProps) => {
  return (
    courses.length > 0 && (
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Completed Courses</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {<CompletedCoursesList completedCourses={completedCourses} />}
        </div>
      </section>
    )
  );
};

export default CompletedCourses;

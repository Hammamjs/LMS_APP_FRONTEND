import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { Course } from '../types/course.types';
import InstructorInfo from './instructor-info';
import { LessonList } from '../../lessons/components/lesson-list';
import { ReviewsSection } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useGetCourseLessons } from '@/features/lessons/hooks/use.get.course.lessons';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useToast } from '@/shared/hooks';
import { useUserEnrolled } from '../hooks/use.is-course-enrolled';
import { CheckCircle } from 'lucide-react';
import { selectIsEnrolled } from '../store/enrollment.store';

export const CourseContent = ({ course }: { course: Course }) => {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  const { toast } = useToast();

  if (!user) return;

  const { isCheckingUserEnrollment } = useUserEnrolled(course.id, user.id);

  const isEnrolled = useSelector(selectIsEnrolled);

  const { data: lessons, isLoading } = useGetCourseLessons(course.id);

  const handleLessonClick = useCallback(
    (lessonId: string) => {
      if (isEnrolled) {
        router.push(`/courses/${course.id}/watch?lesson=${lessonId}`);
      } else {
        toast({
          title: 'Buy to get acess',
          description: 'Please buy the course first',
        });
      }
    },
    [isEnrolled, router, course.id, isCheckingUserEnrollment],
  );

  if (isLoading) return <h1>Lesson page is loading ...</h1>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="lg:max-w-[calc(100%-420px)]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 w-full justify-start border-b bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="instructor"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Instructor
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-8">
                {/* What You'll Learn */}
                <Card>
                  <CardHeader>
                    <CardTitle>What you&apos;ll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {course.whatYouLearn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Description */}
                <div>
                  <h3 className="mb-4 text-xl font-semibold">
                    About This Course
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description.slice(0, 265)} ...
                  </p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Requirements</h3>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="mt-0 mb-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Course Content</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.lessonCount} lessons · {course.duration}
                  </p>
                </CardHeader>
                <CardContent>
                  <LessonList
                    key={`lessons-list-enrolled-${isEnrolled}`}
                    lessons={lessons?.data ?? []}
                    onLessonClick={handleLessonClick}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="mt-0">
              <InstructorInfo course={course} />
            </TabsContent>
          </Tabs>
          <div className="mt-10">
            <ReviewsSection courseId={course.id} />
          </div>
        </div>
      </div>
    </section>
  );
};

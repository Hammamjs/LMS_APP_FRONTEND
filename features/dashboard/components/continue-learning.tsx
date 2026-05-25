import { EnrolledCourse } from '@/features/courses/types';
import { Button, Card, CardContent, Progress } from '@/shared/ui';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  inProgressCourses: EnrolledCourse[];
};

export const ContinueLearning = ({ inProgressCourses }: Props) => {
  return (
    inProgressCourses.length > 0 && (
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Continue Learning</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inProgressCourses.map((enroll) => (
            <Card key={enroll.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={enroll?.course?.image ?? ''}
                  alt={enroll?.course?.title ?? ''}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                  <Button asChild variant="secondary">
                    <Link
                      href={`/courses/${enroll.courseId}/watch`}
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Continue
                    </Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">
                  {enroll?.course?.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {enroll.course?.instructor?.username}
                </p>
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {enroll.progressPercentage}%
                    </span>
                  </div>
                  <Progress value={enroll.progressPercentage} />
                </div>
                <Button asChild className="mt-4 w-full" variant="outline">
                  <Link href={`/courses/${enroll.id}/watch`}>
                    Continue Learning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  );
};

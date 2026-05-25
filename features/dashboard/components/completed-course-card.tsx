import { EnrolledCourse } from '@/features/courses/types';
import { Button, Card, CardContent } from '@/shared/ui';
import { Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  enroll: EnrolledCourse;
};

export const CompletedCourseCard = ({ enroll }: Props) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={enroll.course?.image || ''}
          alt={enroll.course?.title || ''}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white">
            <Award className="h-3 w-3" />
            Completed
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{enroll.course?.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {enroll.course?.instructor?.username}
        </p>
        <Button asChild className="mt-4 w-full" variant="outline">
          <Link href={`/courses/${enroll.id}`}>View Certificate</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

import { Course } from '@/features/courses/types';
import { calcDiscount } from '@/features/courses/lib/calc-price';
import {
  Badge,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { Eye, MoreVertical, Pencil, Star, Trash, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CourseCardInstructorProps = { course: Course };

const CourseCardInstructor = ({ course }: CourseCardInstructorProps) => {
  const trimOverflow = (title: string, count: number = 30) =>
    title.length > count ? `${title.substring(0, count)}...` : title;

  return (
    <Card className="overflow-hidden p-0">
      <div
        className={`relative h-40 bg-linear-to-br ${course.image}`}
        aria-hidden
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          loading="eager"
          className="object-cover"
        />
        <Badge variant="default" className="absolute left-3 top-3">
          Published
        </Badge>
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">
            {trimOverflow(course.title)}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/courses/${course.id}/edit`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/courses/${course.id}`}>
                  <Eye className="h-4 w-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link prefetch href={`/lesson/list`}>
                  <Pencil className="h-4 w-4" />
                  Edit Lessons
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.purchaseCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
            {course.rating || '—'}
          </span>
          <span>{course.lessonCount} lessons</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold text-primary">
            ${calcDiscount(course.originalPrice, course.discountPrice)}
          </span>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/courses/${course.id}/lesson-list`}>Manage</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardInstructor;

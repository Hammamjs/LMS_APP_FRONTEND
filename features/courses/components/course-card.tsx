import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, Badge } from '@/shared/ui';
import { Course } from '../types/course.types';
import { convertTime } from '@/features/lessons/lib/convert-time.helper';
import { calcDiscount } from '../lib';

interface CourseCardProps {
  course: Course;
}

const levelColors = {
  Beginner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Advanced: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export function CourseCard({ course }: CourseCardProps) {
  const hasDiscount =
    course.discountPrice > 0 && course.discountPrice < course.originalPrice;

  const isFree =
    course.originalPrice === 0 || course.originalPrice === course.discountPrice;

  const displayPrice = isFree
    ? 'Free'
    : hasDiscount
      ? `$${course.discountPrice.toFixed(2)}`
      : `$${course.originalPrice.toFixed(2)}`;

  const { hours, minutes, seconds } = convertTime(course.duration);
  const pad = (num: number) => String(num).padStart(2, '0');

  const getTime =
    hours > 0
      ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      : `${pad(minutes)}:${pad(seconds)}`;

  const formattedEnrollment = '10k';

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50 bg-card">
        {/* Course Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />

          {isFree && (
            <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0">
              Free
            </Badge>
          )}

          {!isFree && hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
              {calcDiscount(course.originalPrice, course.discountPrice)}% Off
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          {/* Category & Level */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">
              {course.category}
            </span>
            <span className="text-muted-foreground">·</span>
            <Badge
              variant="outline"
              className={`text-xs ${levelColors[course.level] || ''}`}
            >
              {course.level
                ? course.level.charAt(0).toUpperCase() + course.level.slice(1)
                : ''}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground mb-3">
            {course.instructor?.username}
          </p>

          {/* Rating & Students */}
          <div className="flex items-center gap-4 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground">(0)</span>
            </div>
          </div>

          {/* Duration & Details */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{getTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{formattedEnrollment} students</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{course.lessonCount} lessons</span>
            </div>
          </div>

          {/* Price Layout section */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {displayPrice}
            </span>
            {!isFree && hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${course.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

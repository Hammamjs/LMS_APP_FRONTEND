import { AvatarFallback, Avatar, AvatarImage, Badge } from '@/shared/ui';
import { Course } from '../types/course.types';
import Link from 'next/link';
import {
  Award,
  BarChart3,
  ChevronRight,
  Clock,
  Globe,
  Star,
  Users,
} from 'lucide-react';
import { levelColors } from '../config/course.config';

export const CourseLeftContent = ({ course }: { course: Course }) => {
  return (
    <div className="flex-1 lg:max-w-[calc(100%-400px)]">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-foreground">
          Courses
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/courses?category=${encodeURIComponent(course.category)}`}
          className="hover:text-foreground"
        >
          {course.category}
        </Link>
      </nav>

      {/* Title & Badges */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
        {course.title}
      </h1>

      <p className="mb-6 text-lg text-muted-foreground">
        {course.description.substring(0, 85)}
      </p>

      {/* Meta Info */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{course.rating}</span>
          <span className="text-muted-foreground">
            {/* ({course.reviewCount.toLocaleString()} reviews) */}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="h-4 w-4" />
          {/* <span>{course.enrolledCount.toLocaleString()} students</span> */}
        </div>
        <Badge variant="outline" className={levelColors[course.level]}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </Badge>
      </div>

      {/* Instructor */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={course.instructor.avatar || ''}
            alt={course.instructor.username}
          />
          <AvatarFallback>
            {course.instructor.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">Created by</p>
          <p className="font-medium">{course.instructor.username}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{course.duration} total</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          {/* <span>{course.lessons.length} lessons</span> */}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{course.language}</span>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span>Certificate of completion</span>
        </div>
      </div>
    </div>
  );
};

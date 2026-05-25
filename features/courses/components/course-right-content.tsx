import Image from 'next/image';
import { type Course } from '../types/course.types';
import { Badge, Button, Card, CardContent } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { Award, BarChart3, Globe, PlayCircle } from 'lucide-react';
import { calcDiscount } from '../lib/calc-price';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useUserEnrolled } from '../hooks/use.is-course-enrolled';
import { useEffect } from 'react';
import { selectIsEnrolled } from '../store/enrollment.store';

export const CourseRightContent = ({ course }: { course: Course }) => {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);

  const { isCheckingUserEnrollment } = useUserEnrolled(
    course.id,
    user?.id ?? '',
  );

  const isEnrolled = useSelector(selectIsEnrolled);

  const hasDiscount =
    course.discountPrice > 0 && course.discountPrice < course.originalPrice;
  const finalPrice = hasDiscount ? course.discountPrice : course.originalPrice;

  const formattedPrice =
    finalPrice === 0 ? 'Free' : `$${finalPrice.toFixed(2)}`;
  const isPriceFree = finalPrice === 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((course.originalPrice - course.discountPrice) / course.originalPrice) *
          100,
      )
    : 0;

  const handleEnroll = () => {
    if (isPriceFree) {
      router.push(`/courses/${course.id}/watch`);
    } else {
      router.push(`/checkout?courseId=${course.id}`);
    }
  };

  const handleStartLearning = () => {
    router.push(`/courses/${course.id}/watch`);
  };

  return (
    <Card className="sticky top-24 overflow-hidden border-border/50 shadow-lg">
      {/* Course Image */}
      <div className="relative aspect-video">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <button
          onClick={() => router.push(`/courses/${course.id}/watch`)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50 cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80">
            <PlayCircle className="h-5 w-5" />
            Preview Course
          </span>
        </button>
      </div>

      <CardContent className="p-6">
        {/* Price */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{formattedPrice}</span>
          {course.originalPrice && course.originalPrice > 0 && (
            <>
              <span className="text-lg text-muted-foreground line-through">
                ${course.originalPrice.toFixed(2)}
              </span>
              <Badge variant="secondary" className="ml-2">
                {course.discountPrice}% off
              </Badge>
            </>
          )}
        </div>

        {/* CTA Button */}
        {isPriceFree || isEnrolled ? (
          <Button
            className="w-full mb-4"
            size="lg"
            onClick={handleStartLearning}
          >
            Continue Learning
          </Button>
        ) : (
          <Button className="w-full mb-4" size="lg" onClick={handleEnroll}>
            Buy Now
          </Button>
        )}

        {!isEnrolled && !isPriceFree && (
          <p className="mb-4 text-center text-sm text-muted-foreground">
            30-Day Money-Back Guarantee
          </p>
        )}
        {/* Course Includes */}
        <div className="border-t border-border pt-4">
          <h4 className="mb-3 font-semibold">This course includes:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-primary" />
              {course.duration} on-demand video
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              {course.lessonCount} lessons
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Full lifetime access
            </li>
            <li className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Certificate of completion
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

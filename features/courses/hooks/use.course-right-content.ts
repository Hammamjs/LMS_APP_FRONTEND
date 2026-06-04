import { useRouter } from 'next/navigation';
import { calcDiscount } from '../lib/calc-price';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useUserEnrolled } from '../hooks/use.is-course-enrolled';
import { useEffect } from 'react';
import { selectIsEnrolled } from '../store/enrollment.store';
import { Course } from '../types';

type Props = {
  course: Course;
};

export const useCourseRightContent = ({ course }: Props) => {
  const router = useRouter();

  const isEnrolled = useSelector(selectIsEnrolled);

  const hasDiscount =
    course.discountPrice > 0 && course.discountPrice < course.originalPrice;
  const finalPrice = hasDiscount ? course.discountPrice : course.originalPrice;

  const formattedPrice =
    finalPrice === 0 ? 'Free' : `$${finalPrice.toFixed(2)}`;

  const isPriceFree = finalPrice === 0;

  const discountPercentage = hasDiscount
    ? calcDiscount(course.originalPrice, course.discountPrice)
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

  return {
    router,
    isEnrolled,
    hasDiscount,
    formattedPrice,
    discountPercentage,
    handleEnroll,
    handleStartLearning,
    isPriceFree,
  };
};

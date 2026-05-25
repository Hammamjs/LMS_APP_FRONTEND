'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import {
  XCircle,
  RefreshCw,
  CreditCard,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { useCourseByIdQuery } from '@/features/courses/api/courses.api';
import { calcDiscount } from '@/features/courses/lib/calc-price';
import { useHandleRetry } from '../hooks/use.handle-retry';

export function FailedContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const { handleRetry } = useHandleRetry({ courseId });

  if (!courseId) return;

  const { data: course } = useCourseByIdQuery({ id: courseId });

  if (!course) return notFound();

  const finalPrice = calcDiscount(course.originalPrice, course.discountPrice);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Failed Icon */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Payment Failed
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          We couldn&apos;t process your payment. Don&apos;t worry, no charges
          were made.
        </p>

        {course && (
          <Card className="mb-8 text-left">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    By {course.instructor.username}
                  </p>
                  <p className="mt-2 font-semibold text-primary">
                    ${finalPrice > 0 ? finalPrice.toFixed(2) : 'Free'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Possible Reasons */}
        <Card className="mb-8 text-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-5 w-5" />
              Common Reasons for Payment Failure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span>Card details entered incorrectly</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span>Card expired or not activated for online payments</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span>
                  Transaction blocked by your bank (try contacting them)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                <span>Temporary network or system issues</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={handleRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link href="/checkout/payment-methods">
              <CreditCard className="h-4 w-4" />
              Use Different Card
            </Link>
          </Button>
        </div>

        {/* Back to Course */}
        {course && (
          <div className="mt-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 text-muted-foreground"
            >
              <Link href={`/courses/${course.id}`}>
                <ArrowLeft className="h-4 w-4" />
                Back to Course
              </Link>
            </Button>
          </div>
        )}

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          Still having trouble?{' '}
          <Link href="/support" className="text-primary hover:underline">
            Contact our support team
          </Link>{' '}
          for assistance.
        </p>
      </div>
    </div>
  );
}

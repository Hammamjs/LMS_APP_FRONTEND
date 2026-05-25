'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Play,
  BookOpen,
  Download,
  ArrowRight,
} from 'lucide-react';

import { Card, CardContent, Button, Separator } from '@/shared/ui';
import { useGetCourseByIdQuery } from '@/features/courses/hooks';

export function SuccessContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  if (!courseId) return;

  const { course } = useGetCourseByIdQuery(courseId);

  if (!course) return notFound();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Payment Successful!
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Thank you for your purchase. You now have full access to your course.
        </p>

        {course && (
          <Card className="mb-8 text-left">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      By {course.instructor.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.lessonCount} lessons
                    </span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        <Card className="mb-8 text-left">
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Order Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-mono">
                  ORD-
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span>Credit Card ****4242</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-semibold">
                <span>Total Paid</span>
                <span>${course?.originalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {course && (
            <Button size="lg" asChild className="gap-2">
              <Link href={`/courses/${course.id}/watch`}>
                <Play className="h-4 w-4" />
                Start Learning Now
              </Link>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Receipt */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Download className="h-4 w-4" />
          <button className="underline hover:text-foreground">
            Download Receipt
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-muted-foreground">
          A confirmation email has been sent to your email address.
          <br />
          Need help?{' '}
          <Link href="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}

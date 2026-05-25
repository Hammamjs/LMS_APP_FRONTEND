import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';
import { Button } from '@/shared/ui';

export function NotFoundComponent() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      {/* Large 404 */}
      <div className="mb-8 relative">
        <span className="text-[150px] font-bold leading-none text-muted/20 sm:text-[200px]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/" className="gap-2">
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/courses" className="gap-2">
            <Search className="h-5 w-5" />
            Browse Courses
          </Link>
        </Button>
      </div>

      {/* Help Text */}
      <p className="mt-8 text-sm text-muted-foreground">
        Need help?{' '}
        <Link href="/contact" className="text-primary hover:underline">
          Contact support
        </Link>
      </p>
    </div>
  );
}

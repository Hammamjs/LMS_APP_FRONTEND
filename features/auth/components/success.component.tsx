'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from '@/shared/ui';

export function ResetPasswordSuccessComponent() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Password reset successful
          </CardTitle>
          <CardDescription>
            Your password has been successfully reset. You can now sign in with
            your new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Security Tips */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <p className="text-sm font-medium">Security tips:</p>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />
                Use a unique password for each account
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />
                Consider using a password manager
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />
                Enable two-factor authentication when available
              </li>
            </ul>
          </div>

          {/* dashboard  Button */}
          <Button asChild className="w-full">
            <Link href="/dashboard">Continue to Dashboard</Link>
          </Button>

          {/* Home Link */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Return to homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

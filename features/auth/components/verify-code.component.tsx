'use client';

import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from '@/shared/ui';
import { useVerifyCode } from '../hooks/use.verify-code';

export function VerifyCodeComponent() {
  const {
    code,
    resendTimer,
    inputRefs,

    isLoading,
    isResending,
    isCodeComplete,

    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,

    maskedEmail,
  } = useVerifyCode();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Mail className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We sent a 6-digit verification code to {maskedEmail}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div className="space-y-2">
              <div className="flex justify-center gap-2 sm:gap-3">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="h-12 w-12 text-center text-lg font-semibold sm:h-14 sm:w-14 sm:text-xl"
                    required
                  />
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Enter the code sent to your email
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isCodeComplete}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?{' '}
              {resendTimer > 0 ? (
                <span className="text-foreground">
                  Resend in {resendTimer}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="font-medium text-primary hover:underline disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend code'}
                </button>
              )}
            </p>
          </div>

          {/* Back to Forgot Password */}
          <div className="mt-6">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Use a different email
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

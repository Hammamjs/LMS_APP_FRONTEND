'use client';

import { useEffect, useRef, useState } from 'react';
import { MailCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/shared/ui';
import { cn } from '@/shared/lib';
import Link from 'next/link';
import { useResendEmailCode } from '../hooks/use.resend-email-code';
import { useVerifyEmail } from '../hooks/use.verify-email.hook';
import { getObjectFromSessionStorage } from '@/shared/lib/session-storage.helper';

export function VerifyEmailComponent() {
  const email = getObjectFromSessionStorage('verifyEmail');
  const [code, setCode] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(45);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { resend } = useResendEmailCode();
  const {
    verify,
    isLoading: isVerifying,
    isError,
    isSuccess,
  } = useVerifyEmail();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    if (!email) return;
    console.log(code, email);
    await verify(code, email);
  };

  const handleResend = async () => {
    console.log('Email');
    if (secondsLeft > 0) return;
    setSecondsLeft(45);
    console.log(email);
    if (!email) return;
    await resend(email);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-md border-border/60 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {isSuccess ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <MailCheck className="h-7 w-7" />
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl">
                {isSuccess ? 'Email verified' : 'Verify your email'}
              </CardTitle>
              <CardDescription className="text-base">
                {isSuccess ? (
                  <>Your account is now active. Welcome aboard!</>
                ) : (
                  <>
                    We sent a 6-digit code to{' '}
                    <span className="font-medium text-foreground">{email}</span>
                  </>
                )}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSuccess && (
              <>
                <div className="flex flex-col items-center gap-3">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(v) => {
                      setCode(v);
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                      <InputOTPSlot
                        index={1}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                      <InputOTPSlot
                        index={2}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                      <InputOTPSlot
                        index={4}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                      <InputOTPSlot
                        index={5}
                        className={cn(
                          'h-12 w-12 text-lg',
                          isError && 'border-destructive',
                        )}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  {isError && (
                    <p className="text-sm text-destructive">
                      Invalid code. Please try again.
                    </p>
                  )}
                </div>

                <Button
                  className="w-full h-11"
                  disabled={code.length !== 6 || isVerifying}
                  onClick={handleVerify}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    'Verify email'
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={secondsLeft > 0}
                    className={cn(
                      'font-medium underline-offset-4 hover:underline',
                      secondsLeft > 0
                        ? 'text-muted-foreground cursor-not-allowed'
                        : 'text-primary',
                    )}
                  >
                    {secondsLeft > 0
                      ? `Resend in ${secondsLeft}s`
                      : 'Resend code'}
                  </button>
                </div>
              </>
            )}

            {isSuccess && (
              <Button asChild className="w-full h-11">
                <Link href="/">Continue to dashboard</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
        Wrong email?{' '}
        <Link href="/" className="text-primary hover:underline">
          Use a different account
        </Link>
      </footer>
    </div>
  );
}

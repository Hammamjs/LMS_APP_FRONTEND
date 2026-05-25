'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { getObjectFromSessionStorage } from '@/shared/lib/session-storage.helper';
import { useVerifyResetPassword } from '../hooks/use.verify-reset-password';
import { useToast } from '@/shared/hooks';

export function VerifyCodeComponent() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [email, setEmail] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const { verifyCode, isLoading } = useVerifyResetPassword();
  const { toast } = useToast();

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = getObjectFromSessionStorage('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // const newCode = [...code];
    // newCode[index] = value.slice(-1); // Only take last character
    // setCode(newCode);

    setCode((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus last filled input or first empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    try {
      await verifyCode(fullCode, email);
      toast({ title: 'Code verified' });

      router.push('/reset-password');
    } catch (err) {
      toast({ title: 'Failed, request new code' });
      console.log(err);
    }
  };

  const handleResend = async () => {
    setIsResending(true);

    // Simulate API call to resend code
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsResending(false);
    setResendTimer(60);
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  // Mask email for display
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : 'your email';

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

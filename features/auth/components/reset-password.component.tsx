'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, GraduationCap, Check, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
} from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { TResetPasswordSchema } from '../schema/reset-password.schema';
import { passwordRequirementsHelper } from '../lib/password.requirements.helper';
import { useResetPassword } from '../hooks/use.reset-password';
import {
  getObjectFromSessionStorage,
  removeFromSessionStorage,
} from '@/shared/lib/session-storage.helper';
import { useToast } from '@/shared/hooks';

export function ResetPasswordComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<TResetPasswordSchema>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
  });

  const { resetPassword, isLoading } = useResetPassword();

  const { toast } = useToast();

  // for reactivity
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const { allRequirementsMet, passwordsMatch, requirements } =
    passwordRequirementsHelper(newPassword, confirmPassword);

  const onSubmit = async (data: TResetPasswordSchema) => {
    if (!allRequirementsMet || !passwordsMatch) return;

    try {
      const email = getObjectFromSessionStorage('resetEmail');

      console.log(email);

      await resetPassword({ ...data, email });

      removeFromSessionStorage('resetEmail');
      removeFromSessionStorage('codeVerified');

      toast({ title: 'Reset password done succesfully' });

      // Redirect to success page
      router.push('/reset-password/success');
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Lock className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Set new password</CardTitle>
          <CardDescription>
            Create a strong password that you don&apos;t use for other websites.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  {...register('newPassword')}
                  className="pl-10 pr-10"
                  aria-invalid={!!errors.newPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {newPassword && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Password requirements:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {requirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-xs ${
                        req.met
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {req.met ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  {...register('confirmPassword')}
                  className="pl-10 pr-10"
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {newPassword && !passwordsMatch && (
                <p className="text-xs text-destructive">
                  Passwords do not match
                </p>
              )}
              {passwordsMatch && (
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" />
                  Passwords match
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !allRequirementsMet || !passwordsMatch}
            >
              {isLoading ? 'Resetting password...' : 'Reset Password'}
            </Button>
          </form>

          {/* Back to Sign In */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

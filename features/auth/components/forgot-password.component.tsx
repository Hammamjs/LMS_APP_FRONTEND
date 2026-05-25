'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, GraduationCap } from 'lucide-react';
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
import { TForgotPasswordSchema } from '../schema/forgot-password.schema';
import { useForgotPassword } from '../hooks/use.forgot-password';
import { useToast } from '@/shared/hooks';
import { setSessionStorage } from '@/shared/lib/session-storage.helper';

export function ForgotPasswordComponent() {
  const router = useRouter();

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<TForgotPasswordSchema>({
    defaultValues: {
      email: '',
    },
  });

  const [forgotPassword, { isLoading }] = useForgotPassword();

  const { toast } = useToast();

  const onSubmit = async (data: TForgotPasswordSchema) => {
    // Simulate API call to send verification code
    try {
      const response = await forgotPassword({ email: data.email }).unwrap();
      toast({ title: response.message });

      // Store email in sessionStorage for the next steps (demo purposes)
      setSessionStorage('resetEmail', data.email);

      router.push('/verify-code');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
          <CardDescription>
            No worries, we&apos;ll send you a verification code to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className="pl-10"
                  aria-invalid={!!errors.email}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the email address associated with your account.
              </p>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isLoading ? 'Sending code...' : 'Send Verification Code'}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-6">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

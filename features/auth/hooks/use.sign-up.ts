import { useToast } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { SignUpSchema, SignUpSchemaType } from '../schema/sign-up.schema';
import { useSignUpMutationAction } from './use.sign-up.query';
import { setSessionStorage } from '@/shared/lib/session-storage.helper';

export const useSignUp = () => {
  const router = useRouter();

  const { signup, isLoading, error, isError } = useSignUpMutationAction();

  const { toast } = useToast();

  const onSubmit = async (data: SignUpSchemaType) => {
    const result = SignUpSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.map((issue) =>
        toast({ title: issue.path[0] as string, description: issue.message }),
      );
      return;
    }

    try {
      await signup(data);
      toast({ title: 'One step remaining verify your account' });
      setSessionStorage('verifyEmail', data.email);
      router.push('/verify-email');
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Failed to register',
      });

      console.log(err);
    }
  };

  return {
    onSubmit,
    isLoading,
    error,
    isError,
  };
};

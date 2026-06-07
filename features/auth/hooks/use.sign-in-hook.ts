import { useRouter, useSearchParams } from 'next/navigation';
import { SignInValidationSchemaType } from '../schema/sign-in.schema';
import { useSigninMutation } from '../api/sign-in.api';
import { useToast } from '@/shared/hooks';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/sign-in.store';

const useSignInMutationAction = () => {
  const router = useRouter();

  const [signin, result] = useSigninMutation();

  const { toast } = useToast();

  const searchParam = useSearchParams();
  const rawFrom = searchParam.get('from');
  const from = rawFrom && rawFrom.startsWith('/') ? rawFrom : '/';

  // save user data to store
  const dispatch = useDispatch();

  const onSubmit = async (data: SignInValidationSchemaType) => {
    try {
      const res = await signin(data).unwrap();
      router.push(from);
      dispatch(setCredentials(res));
    } catch (err: any) {
      const message: string =
        typeof err?.data.message == 'string'
          ? err?.data.message
          : 'Something went wrong';

      toast({
        title: 'Failed to login',
        description: message,
      });
    }
  };

  return { onSubmit, ...result };
};

export default useSignInMutationAction;

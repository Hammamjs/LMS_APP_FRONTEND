import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../store';
import { useGetMeQuery } from '../api/sign-in.api';

export const useGetCurrentUser = ({
  authChecked,
}: {
  authChecked: boolean;
}) => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const hasLocalAuth = !!token && !!user;

  const result = useGetMeQuery(undefined, {
    skip: hasLocalAuth || authChecked,
  });

  return {
    hasLocalAuth,
    ...result,
  };
};

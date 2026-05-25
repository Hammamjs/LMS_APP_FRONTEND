'use client';

import { useGetCurrentUser } from '@/features/auth/hooks';
import { AppLoader } from '@/shared/components/app-loader';
import { useEffect, useState } from 'react';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const [authChecked, setAuthchecked] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isLoading, isFetching, isError, hasLocalAuth } = useGetCurrentUser({
    authChecked,
  });

  useEffect(() => {
    if (isError) setAuthchecked(true);
  }, [isError]);

  if (!isMounted) return <>{children}</>;

  const isInitializing = !hasLocalAuth && (isLoading || isFetching);

  if (isInitializing) return <AppLoader />;

  return children;
};

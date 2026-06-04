import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';

import {
  selectCurrentToken,
  selectCurrentUser,
} from '@/features/auth/store/sign-in.store';
import { useToast } from '../hooks';
import { useLogOutMutationAction } from '@/features/auth/hooks';
import { navLinks } from '../lib/rbac.helper';

export const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const { logout } = useLogOutMutationAction();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: 'You logged out' });
      // force browser to refresh
      window.location.reload();
    } catch (err) {
      toast({
        title: err instanceof Error ? err.message : 'Logged you out failed',
      });
    }
  };

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const links = navLinks(user?.id ?? '', user?.role);

  const handleSearch = (e?: React.SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (searchQuery.trim()) {
      window.location.href = `/courses?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    setSearchQuery,
    pathname,
    theme,

    handleLogout,
    handleSearch,
    user,
    token,
    links,
    searchQuery,
    setTheme,
  };
};

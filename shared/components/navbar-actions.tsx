import { User } from '@/features/users/types';
import { Button } from '../ui';
import Link from 'next/link';
import { SetStateAction } from 'react';

type Props = {
  user: User | null;
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
  handleLogout: () => void;
};

export const NavbarActions = ({ user, setIsMenuOpen, handleLogout }: Props) => {
  return !user ? (
    <>
      <Button variant="outline" asChild>
        <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
          Sign In
        </Link>
      </Button>

      <Button asChild>
        <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
          Join for Free
        </Link>
      </Button>
    </>
  ) : (
    <>
      <Button variant="outline" asChild>
        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
          Dashboard
        </Link>
      </Button>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

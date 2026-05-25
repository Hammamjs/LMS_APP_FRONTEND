'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search, Moon, Sun, GraduationCap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button, Input } from '@/shared/ui';
import { useSelector } from 'react-redux';

import { cn } from '@/shared/lib/utils';
import {
  selectCurrentToken,
  selectCurrentUser,
} from '@/features/auth/store/sign-in.store';
import { NotificationSystem } from '../../features/notification/components/notification-system';
import { UserMenu } from './user-menu';
import { NotificationListener } from '../../features/notification/components/notification-listener';
import { useLogOutMutationAction } from '@/features/auth/hooks';
import { useToast } from '../hooks';

const navLinks = (id: string) => [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'My Learning' },
  { href: '/categories', label: 'Categories' },
  { href: '/checkout/user-history', label: 'My Payments' },
  { href: '/instructor/add-course', label: 'Add new course' },
  { href: '/lessons/add', label: 'Add Lesson' },
  { href: `/instructor/${id}/me`, label: 'My Courses' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const { logout } = useLogOutMutationAction();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await logout();
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

  const links = navLinks(user?.id ?? '');

  const handleSearch = (e?: React.SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (searchQuery.trim()) {
      window.location.href = `/courses?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}

            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>

            <span className="hidden text-lg sm:block">LearnHub</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-xl lg:flex"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/50 pl-10"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden sm:flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <NotificationSystem />

          {/* User Menu */}
          <UserMenu handleLogout={handleLogout} />
        </div>
      </nav>

      {/* Drawer Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </form>

            {/* Navigation Links */}
            <div className="grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="justify-start gap-2"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}

                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>

              {!user ? (
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
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </Button>

                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {token && <NotificationListener token={token} />}
    </header>
  );
}

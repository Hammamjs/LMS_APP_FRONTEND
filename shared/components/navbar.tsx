'use client';

import Link from 'next/link';

import { Menu, X, Search, Moon, Sun, GraduationCap } from 'lucide-react';
import { Button, Input } from '@/shared/ui';

import { cn } from '@/shared/lib/utils';

import { UserMenu } from './user-menu';
import { NotificationListener } from '../../features/notification/components/notification-listener';
import { NotificationSystem } from '../../features/notification/components/notification-system';
import { useNavbar } from '../hooks/use.navbar';
import { NavbarActions } from './navbar-actions';

export function Navbar() {
  const {
    handleLogout,
    handleSearch,
    isMenuOpen,
    links,
    pathname,
    setIsMenuOpen,
    setSearchQuery,
    theme,
    token,
    setTheme,
    user,
    searchQuery,
  } = useNavbar();

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
              <NavbarActions
                user={user}
                handleLogout={handleLogout}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </div>
        </div>
      )}
      {token && <NotificationListener token={token} />}
    </header>
  );
}

import { Role } from '@/features/users/types';

export const navLinks = (id: string, role?: Role) => [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'My Learning' },
  { href: '/categories', label: 'Categories' },
  { href: '/checkout/user-history', label: 'My Payments' },

  ...(role === 'Instructor' || role === 'Admin'
    ? [
        { href: '/instructor/add-course', label: 'Add new course' },
        { href: '/lessons/add', label: 'Add Lesson' },
        { href: `/instructor/${id}/me`, label: 'My Courses' },
      ]
    : []),
];

export const rows = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@learnhub.io',
    courses: 12,
    status: 'Active',
    joined: 'Jan 2023',
    revenue: '$84,210',
  },
  {
    name: 'Marcus Lee',
    email: 'marcus@learnhub.io',
    courses: 8,
    status: 'Active',
    joined: 'Mar 2023',
    revenue: '$52,180',
  },
  {
    name: 'Priya Patel',
    email: 'priya@learnhub.io',
    courses: 6,
    status: 'Pending',
    joined: 'Sep 2024',
    revenue: '$0',
  },
  {
    name: 'David Chen',
    email: 'david@learnhub.io',
    courses: 5,
    status: 'Active',
    joined: 'Nov 2023',
    revenue: '$31,440',
  },
  {
    name: 'Aisha Rahman',
    email: 'aisha@learnhub.io',
    courses: 4,
    status: 'Suspended',
    joined: 'Jul 2023',
    revenue: '$18,920',
  },
  {
    name: 'Tomás Rivera',
    email: 'tomas@learnhub.io',
    courses: 7,
    status: 'Active',
    joined: 'Apr 2024',
    revenue: '$26,510',
  },
];

export const stats = [
  { label: 'Total instructors', value: '248' },
  { label: 'Active', value: '212' },
  { label: 'Pending approval', value: '14' },
  { label: 'Avg. revenue / instructor', value: '$12.4k' },
];

export function statusVariant(s: string) {
  if (s === 'Active') return 'default';
  if (s === 'Pending') return 'secondary';
  return 'destructive';
}

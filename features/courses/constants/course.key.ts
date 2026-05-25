export const courseKey = {
  type: 'Course' as const,
  list: () => ({ type: 'Course', id: 'LIST' }) as const,
  details: (id: string) => ({ type: 'Course', id }) as const,
};

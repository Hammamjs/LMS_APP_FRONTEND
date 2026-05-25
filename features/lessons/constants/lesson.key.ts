export const lessonKey = {
  type: 'Lessons' as const,
  list: () => ({ type: 'Lessons', id: 'LIST' }) as const,
  details: (id: string) => ({ type: 'Lessons', id }) as const,
};

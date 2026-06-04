export const reviewKey = {
  type: 'REVIEW' as const,
  details: (courseId: string) =>
    ({ type: reviewKey.type, id: courseId }) as const,
  list: () => ({ type: reviewKey.type, id: 'LIST' }) as const,
};

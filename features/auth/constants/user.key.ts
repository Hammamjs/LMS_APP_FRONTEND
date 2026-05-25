export const userKey = {
  type: 'User' as const,
  list: () => ({ type: 'User', id: 'LIST' }) as const,
  details: (id: string) => ({ type: 'User', id }) as const,
};

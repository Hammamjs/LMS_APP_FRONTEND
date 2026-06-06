const isBrowser = typeof window !== 'undefined';

export const getSessionStorage = (key: string) =>
  isBrowser ? sessionStorage.getItem(key) : null;

export const setSessionStorage = (key: string, value: unknown) => {
  if (isBrowser) sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeFromSessionStorage = (key: string) => {
  if (isBrowser) sessionStorage.removeItem(key);
};

export const getObjectFromSessionStorage = (key: string) => {
  const value = getSessionStorage(key);
  return JSON.parse(value ? value : '{}');
};

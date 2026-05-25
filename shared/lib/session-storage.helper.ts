export const getSessionStorage = (key: string) => sessionStorage.getItem(key);

export const setSessionStorage = (key: string, value: unknown) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const removeFromSessionStorage = (key: string) =>
  sessionStorage.removeItem(key);

export const getObjectFromSessionStorage = (key: string) => {
  const value = getSessionStorage(key);
  return JSON.parse(value ? value : '{}');
};

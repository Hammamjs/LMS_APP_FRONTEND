import { Result as TResult } from '../types/result.pattern';

export const Result = {
  ok: <T>(value: T): TResult<T> => ({ ok: true, value }),
  fail: <E>(error: E): TResult<never, E> => ({ ok: false, error }),
};

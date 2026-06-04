export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type Meta = {
  page: number;
  total: number;
  limit: number;
  lastPage: number;
  hasNext: boolean;
  hasPrev: boolean;
};

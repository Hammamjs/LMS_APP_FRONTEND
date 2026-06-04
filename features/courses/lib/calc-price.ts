export const calcDiscount = (original: number, discounted: number): number => {
  if (!original || original <= 0) return 0;

  const percent = ((original - discounted) / original) * 100;

  return Math.max(0, Math.min(100, Math.round(percent)));
};

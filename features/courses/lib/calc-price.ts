export const calcDiscount = (
  originalPrice: number,
  discountPrecentage: number,
): number =>
  Math.round(((originalPrice - discountPrecentage) / originalPrice) * 100);

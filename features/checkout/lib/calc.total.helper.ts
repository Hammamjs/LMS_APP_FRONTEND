import { PaymentResponse } from '../types/types';

export const calcTotalPayments = (payments: PaymentResponse[]) =>
  payments.reduce((prev, next) => prev + next.amount, 0);

export const activeCourses = (payments: PaymentResponse[]): number =>
  payments.filter((p) => p.status == 'SUCCESS').length;

import { Button, TableCell, TableRow } from '@/shared/ui';
import { Building2, CreditCard, Receipt } from 'lucide-react';
import { StatusBadge } from './status-badge';
import { PaymentResponse } from '../types/types';

type PaymentProps = {
  payment: PaymentResponse;
};

export const Payments = ({ payment }: PaymentProps) => {
  const isStripe = payment.provider === 'STRIPE';

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">
          {payment.course?.title ?? 'Unknown course'}
        </div>
        <div className="text-xs text-muted-foreground">{payment.id}</div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1.5 text-sm">
          {isStripe ? (
            <CreditCard className="h-4 w-4" />
          ) : (
            <Building2 className="h-4 w-4" />
          )}
          {isStripe ? 'Card' : 'Bank'}
        </div>
      </TableCell>

      <TableCell>
        <StatusBadge s={payment.status} />
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {new Date(payment.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell className="text-right font-medium">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(payment.amount)}
      </TableCell>

      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          disabled={payment.status !== 'SUCCESS'}
        >
          <Receipt className="mr-1.5 h-4 w-4" /> PDF
        </Button>
      </TableCell>
    </TableRow>
  );
};

import { Badge } from '@/shared/ui';
import { CheckCircle2, Clock, RotateCcw, XCircle } from 'lucide-react';

type Status = 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';

export const StatusBadge = ({ s }: { s: Status }) => {
  const map = {
    SUCCESS: { v: 'default' as const, icon: CheckCircle2, label: 'Paid' },
    PENDING: { v: 'secondary' as const, icon: Clock, label: 'Pending' },
    FAILED: { v: 'destructive' as const, icon: XCircle, label: 'Failed' },
    REFUNDED: { v: 'outline' as const, icon: RotateCcw, label: 'Refunded' },
  }[s];
  const Icon = map.icon;
  return (
    <Badge variant={map.v} className="gap-1">
      <Icon className="h-3 w-3" />
      {map.label}
    </Badge>
  );
};

import { TableCell, TableRow } from '@/shared/ui';
import { Skeleton } from '@/shared/ui/skeleton';

export const PaymentSkeleton = () => {
  return (
    <TableRow>
      {/* Course + ID */}
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </TableCell>

      {/* Provider */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Skeleton className="h-5 w-20 rounded-full" />
      </TableCell>

      {/* Date */}
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>

      {/* Amount */}
      <TableCell className="text-right">
        <Skeleton className="ml-auto h-4 w-16" />
      </TableCell>

      {/* Action */}
      <TableCell className="text-right">
        <Skeleton className="ml-auto h-8 w-20 rounded-md" />
      </TableCell>
    </TableRow>
  );
};

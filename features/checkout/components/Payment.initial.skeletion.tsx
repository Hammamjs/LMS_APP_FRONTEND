import {
  Card,
  CardContent,
  CardHeader,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { Table } from 'lucide-react';
import { PaymentSkeleton } from './payment.skeletion';

export const PaymentLoading = () => {
  return (
    <div className="containr mx-auto space-y-6">
      <h1 className="mb-4 text-2xl font-bold">Payment history</h1>
      <p className="text-muted-foreground mb-6">
        Every purchase and refund tied to your account.
      </p>

      {/* Summary skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table skeleton */}
      <Card>
        <CardHeader>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <PaymentSkeleton key={i} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

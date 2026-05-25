'use client';

import Link from 'next/link';
import { Download, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/ui';
import { useGetUserHistoryQuery } from '../store/checkout.api';
import { ChangeEvent, useEffect, useState } from 'react';
import { activeCourses, calcTotalPayments } from '../lib/calc.total.helper';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { PaymentHistoryMapper } from './paymet.history.mapper';
import { PaymentSkeleton } from './payment.skeletion';
import { PaymentLoading } from './Payment.initial.skeletion';

export function AccountPaymentsComponent() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | string>('all');

  const debounceSearch = useDebounce(search);

  const {
    data: paymentsHistory,
    isLoading,
    isFetching,
  } = useGetUserHistoryQuery({
    search: debounceSearch,
    status: status !== 'all' ? status : undefined,
  });

  if (isLoading) {
    return <PaymentLoading />;
  }

  const totalRevenu = calcTotalPayments(paymentsHistory?.data ?? []);
  const calcSucceededPayments = activeCourses(paymentsHistory?.data ?? []);

  const summary = [
    { label: 'Total spent', value: `$${totalRevenu}` },
    { label: 'Purchases', value: paymentsHistory?.data.length },
    { label: 'Active courses', value: calcSucceededPayments },
    { label: 'Refunded', value: '$0' },
  ];

  const shimmer = Array.from({ length: 5 }).map((_, index) => (
    <PaymentSkeleton key={index} />
  ));

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="mb-4 text-2xl font-bold">Payment history</h1>
      <p className="text-muted-foreground mb-6">
        Every purchase and refund tied to your account.
      </p>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" /> Download all
      </Button>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Receipts are available for insful payments.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search course or invoice…"
                className="pl-8 md:w-64"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="md:w-40">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="SUCCESS">Paid</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                {/* <SelectItem value="REFUNDED">Refunded</SelectItem> */}
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              {isFetching ? (
                shimmer
              ) : paymentsHistory?.data?.length ? (
                <PaymentHistoryMapper payments={paymentsHistory.data} />
              ) : (
                <TableRow>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No payments found
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>Need help with a charge?</span>
            <Link
              href="/"
              className="text-primary underline-offset-4 hover:underline"
            >
              Contact support
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

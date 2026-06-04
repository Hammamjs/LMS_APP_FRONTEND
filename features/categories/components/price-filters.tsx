import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import React from 'react';

type Props = {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PriceFilters = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <Select
      value={selectedPrice || 'all'}
      onValueChange={(v) => setSelectedPrice(v === 'all' ? null : v)}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Prices</SelectItem>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
      </SelectContent>
    </Select>
  );
};

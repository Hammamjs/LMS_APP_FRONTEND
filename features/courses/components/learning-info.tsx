import { Button } from '@/shared/ui';
import { Trash2 } from 'lucide-react';
import React from 'react';

type LearningProps = {
  item: string;
  onRemoveItem: (index: number) => void;
  index: number;
};

export const LearningInfo = ({ index, item, onRemoveItem }: LearningProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-sm">{item}</span>

      <Button variant="ghost" size="icon" onClick={() => onRemoveItem(index)}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

import { Badge } from '@/shared/ui';
import { Trash2 } from 'lucide-react';

type RequirementProp = {
  item: string;
  onRemoveItem: (index: number) => void;
  index: number;
};

export const Requirement = ({ item, onRemoveItem, index }: RequirementProp) => {
  return (
    <Badge className="gap-2 px-3 py-1">
      {item}

      <button type="button" onClick={() => onRemoveItem(index)}>
        <Trash2 className="h-3 w-3" />
      </button>
    </Badge>
  );
};

import { Trash2 } from 'lucide-react';
import { Badge } from '@/shared/ui';

type AudienceInfoProps = {
  item: string;
  index: number;

  onRemoveItem: (index: number) => void;
};

export const AudienceInfo = ({
  item,
  onRemoveItem,
  index,
}: AudienceInfoProps) => {
  return (
    <Badge variant="secondary" className="gap-2 px-3 py-1">
      {item}

      <button type="button" onClick={() => onRemoveItem(index)}>
        <Trash2 className="h-3 w-3" />
      </button>
    </Badge>
  );
};

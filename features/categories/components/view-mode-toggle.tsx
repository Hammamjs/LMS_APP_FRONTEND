import { Button } from '@/shared/ui';
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';

type ViewMode = 'grid' | 'list';

type Props = {
  viewMode: ViewMode;

  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

export const ViewModeToggle = ({ viewMode, setViewMode }: Props) => {
  return (
    <div className="hidden sm:flex items-center gap-1 rounded-md border border-border p-1">
      <Button
        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
        size="icon"
        className="h-8 w-8"
        onClick={() => setViewMode('grid')}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
        size="icon"
        className="h-8 w-8"
        onClick={() => setViewMode('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

import { Badge, Button } from '@/shared/ui';
import React from 'react';

type Props = {
  selectedLevel: string | undefined;
  selectedPrice: string | null;
  searchQuery: string | null;

  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;

  onClear: () => void;
};

export const ActiveCategoryFilters = ({
  onClear,
  searchQuery,
  selectedLevel,
  selectedPrice,

  setSelectedLevel,
  setSelectedPrice,
  setSearchQuery,
}: Props) => {
  return (
    (selectedLevel || selectedPrice || searchQuery) && (
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Active filters:</span>
        {searchQuery && (
          <Badge variant="secondary" className="gap-1">
            Search: {searchQuery}
            <button
              onClick={() => setSearchQuery('')}
              className="ml-1 hover:text-destructive"
            >
              &times;
            </button>
          </Badge>
        )}
        {selectedLevel && (
          <Badge variant="secondary" className="gap-1 capitalize">
            {selectedLevel}
            <button
              onClick={() => setSelectedLevel(undefined)}
              className="ml-1 hover:text-destructive"
            >
              &times;
            </button>
          </Badge>
        )}
        {selectedPrice && (
          <Badge variant="secondary" className="gap-1 capitalize">
            {selectedPrice}
            <button
              onClick={() => setSelectedPrice(null)}
              className="ml-1 hover:text-destructive"
            >
              &times;
            </button>
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive"
        >
          Clear all
        </Button>
      </div>
    )
  );
};

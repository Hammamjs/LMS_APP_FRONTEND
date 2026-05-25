import { Button, Card, CardContent, Input } from '@/shared/ui';
import { Plus, Trash2 } from 'lucide-react';
import { LearningList } from './learning-list';
import React from 'react';

type LearningProps = {
  learnInput: string;
  onAddItem: (learnInput: string, clear: () => void) => void;
  onRemoveItem: (index: number) => void;
  learnItems: string[];
  setLearnInput: React.Dispatch<React.SetStateAction<string>>;
};

export const Learning = ({
  onAddItem,
  learnInput,
  learnItems,
  onRemoveItem,
  setLearnInput,
}: LearningProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div>
          <h2 className="font-semibold">What students will learn</h2>

          <p className="text-sm text-muted-foreground">
            Add learning outcomes.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={learnInput}
            onChange={(e) => setLearnInput(e.target.value)}
            placeholder="Add learning outcome..."
          />

          <Button
            type="button"
            onClick={() => onAddItem(learnInput, () => setLearnInput(''))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <LearningList learnItems={learnItems} onRemoveItem={onRemoveItem} />
        </div>
      </CardContent>
    </Card>
  );
};

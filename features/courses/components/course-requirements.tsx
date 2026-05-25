import { Button, Card, CardContent, Input } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { RequirementsList } from './requirements-list';
import React from 'react';

type CourseRequirements = {
  requirementInput: string;

  onAddRequirement: (requirementInput: string, clear: () => void) => void;

  requirements: string[];
  setRequirementInput: React.Dispatch<React.SetStateAction<string>>;
  onRemoveItem: (index: number) => void;
};

export const CourseRequirements = ({
  onAddRequirement,
  requirements,
  requirementInput,
  setRequirementInput,
  onRemoveItem,
}: CourseRequirements) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div>
          <h2 className="font-semibold">Requirements</h2>

          <p className="text-sm text-muted-foreground">
            What students should know before starting.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            placeholder="Add requirement..."
          />

          <Button
            type="button"
            onClick={() =>
              onAddRequirement(requirementInput, () => setRequirementInput(''))
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <RequirementsList
            requirements={requirements}
            onRemoveItem={onRemoveItem}
          />
        </div>
      </CardContent>
    </Card>
  );
};

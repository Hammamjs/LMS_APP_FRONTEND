import { Button, Card, CardContent, Input } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { AudienceList } from './audience-list';
import { removeItem } from 'framer-motion';
import React from 'react';

type AudienceProps = {
  audienceInput: string;
  targetAudience: string[];
  onAddAudience: (audienceInput: string, clear: () => void) => void;

  onRemoveAudience: (index: number) => void;

  setAudienceInput: React.Dispatch<React.SetStateAction<string>>;
};

export const Audience = ({
  audienceInput,
  onAddAudience,
  onRemoveAudience,
  setAudienceInput,
  targetAudience,
}: AudienceProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div>
          <h2 className="font-semibold">Target audience</h2>

          <p className="text-sm text-muted-foreground">
            Who is this course for?
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            value={audienceInput}
            onChange={(e) => setAudienceInput(e.target.value)}
            placeholder="Add audience..."
          />

          <Button
            type="button"
            onClick={() =>
              onAddAudience(audienceInput, () => setAudienceInput(''))
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <AudienceList
          onRemoveItem={onRemoveAudience}
          targetAudience={targetAudience}
        />
      </CardContent>
    </Card>
  );
};

import { Label, Input, Textarea, Button } from '@/shared/ui';
import React from 'react';

type Props = {
  name: string;
  bio: string;
  isSaving: boolean;

  handleSave: () => void;

  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
};

export const EditUserForm = ({
  bio,
  handleSave,
  isSaving,
  name,
  setBio,
  setIsEditing,
  setName,
}: Props) => {
  return (
    <div className="mt-6 space-y-4 border-t border-border pt-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

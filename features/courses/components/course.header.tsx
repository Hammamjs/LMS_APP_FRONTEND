import { Save, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui';

type Props = {
  lessonId: string;
};

export const CourseHeader = ({ lessonId }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit lesson</h1>

        <p className="text-muted-foreground">Update lesson {lessonId}</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          <Trash2 className="h-4 w-4" />
          Delete lesson
        </Button>

        <Button>
          <Save className="h-4 w-4" />
          Save changes
        </Button>
      </div>
    </div>
  );
};

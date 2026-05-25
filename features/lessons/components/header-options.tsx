import { Button } from '@/shared/ui';
import { Save, Trash2 } from 'lucide-react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { TUpdateLessonSchema } from '../schema/update-lesson.schema';

type Props = {
  handleShowDeleteModel: () => void;
  onSubmit: (data: TUpdateLessonSchema) => void;
  isLoading: boolean;
  handleSubmit: UseFormHandleSubmit<TUpdateLessonSchema>;
};

export const HeaderOptions = ({
  handleShowDeleteModel,
  isLoading,
  onSubmit,
  handleSubmit,
}: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold">Edit Lesson</h1>

        <p className="text-muted-foreground">Update lesson information.</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleShowDeleteModel}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>

        <Button onClick={handleSubmit(onSubmit)}>
          {isLoading ? (
            <p className="w-3 h-3 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></p>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

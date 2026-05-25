import { Input } from '@/shared/ui';
import { Video } from 'lucide-react';
import { useLessonContext } from '../hooks/use.lesson.context';

export const UploadMode = () => {
  const { setFile, previewUrl } = useLessonContext();
  return (
    <div className="space-y-4">
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/40">
        {previewUrl ? (
          <video
            src={previewUrl}
            controls
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <Video className="h-6 w-6" />
            Drag & drop video or click to upload
          </div>
        )}
      </div>

      <Input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const selected = e.target.files?.[0];

          if (selected) {
            setFile(selected);
          }
        }}
      />
    </div>
  );
};

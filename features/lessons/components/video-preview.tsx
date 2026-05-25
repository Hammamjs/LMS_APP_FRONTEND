import { SwitchMode } from './switch-mode';
import { Link2, Upload } from 'lucide-react';
import { Label } from '@/shared/ui';
import { useFetchVideoMetaData } from '../hooks/use.fetch-video.meta';
import { useLessonContext } from '../hooks/use.lesson.context';

export const VideoPreview = () => {
  const { setMode, mode } = useLessonContext();

  useFetchVideoMetaData();

  return (
    <div className="space-y-4">
      {/* MODE SWITCH */}
      <div className="flex items-center justify-between">
        <Label>Lesson video</Label>

        <div className="flex rounded-lg border p-1">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs transition ${
              mode === 'upload'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload
          </button>

          <button
            type="button"
            onClick={() => setMode('link')}
            className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs transition ${
              mode === 'link'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            <Link2 className="h-3.5 w-3.5" />
            YouTube
          </button>
        </div>
      </div>

      {/* -------------------- UPLOAD - Link MODE -------------------- */}
      <SwitchMode />
    </div>
  );
};

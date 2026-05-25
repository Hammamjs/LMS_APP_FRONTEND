import { Input } from '@/shared/ui';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useLessonContext } from '../hooks/use.lesson.context';

type YouTubeMeta = {
  title: string;
  thumbnail: string;
  author_name: string;
};

type LinkModeProps = {
  url: string;
  setUrl: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  meta: YouTubeMeta | null;
  error: boolean;
};

export const LinkMode = () => {
  const { url, setUrl, loading, meta, error } = useLessonContext();
  return (
    <div className="space-y-4">
      <Input
        value={url ?? ''}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL..."
      />

      {/* LOADING */}
      {loading && (
        <div className="flex aspect-video items-center justify-center rounded-lg border bg-muted">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Fetching video...
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {meta && !loading && (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={meta.thumbnail}
              alt={meta.title}
              className="aspect-video w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-medium">{meta.title}</p>

            <p className="text-xs text-muted-foreground">{meta.author_name}</p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-500">
          Invalid YouTube link
        </div>
      )}
    </div>
  );
};

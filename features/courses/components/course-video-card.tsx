'use client';

import { useState } from 'react';

import { Card, CardContent, Input, Label } from '@/shared/ui';

import { Upload, Link2, Loader2, Video } from 'lucide-react';

import { useVideoPreview } from '../hooks/use.video-preview';
import { useFetchYoutubeMeta } from '../hooks/use.fetch-youtube.meta';

export const CourseVideoCard = () => {
  const [mode, setMode] = useState<'upload' | 'link'>('upload');

  const [url, setUrl] = useState('');

  const { previewUrl, setFile } = useVideoPreview();

  const { loading, meta, error } = useFetchYoutubeMeta(url, mode);

  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        {/* mode switch */}

        <div className="flex items-center justify-between">
          <Label>Lesson video</Label>

          <div className="flex rounded-lg border p-1">
            <button type="button" onClick={() => setMode('upload')}>
              <Upload className="h-4 w-4" />
              Upload
            </button>

            <button type="button" onClick={() => setMode('link')}>
              <Link2 className="h-4 w-4" />
              YouTube
            </button>
          </div>
        </div>

        {mode === 'upload' && (
          <div className="space-y-4">
            <div className="flex aspect-video items-center justify-center rounded-lg border">
              {previewUrl ? (
                <video
                  src={previewUrl}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground">
                  <Video />
                </div>
              )}
            </div>

            <Input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setFile(file);
                }
              }}
            />
          </div>
        )}

        {mode === 'link' && (
          <div className="space-y-4">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL..."
            />

            {loading && (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                Loading...
              </div>
            )}

            {meta && (
              <div>
                <img src={meta.thumbnail} alt={meta.title} />

                <p>{meta.title}</p>
              </div>
            )}

            {error && <div className="text-red-500">Invalid link</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

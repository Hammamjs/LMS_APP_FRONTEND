import { Card, CardContent, Input, Label } from '@/shared/ui';
import { ImagePlus } from 'lucide-react';
import React from 'react';

type ImagePreviewProps = {
  setImageMode: React.Dispatch<React.SetStateAction<'upload' | 'url'>>;
  imageMode: 'upload' | 'url';
  imageUrl: string;
  preview: string | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const ImagePreview = ({
  imageMode,
  preview,
  setFile,
  setImageMode,
  imageUrl,
  setImageUrl,
}: ImagePreviewProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Label>Course image</Label>

          <div className="flex rounded-lg border p-1">
            <button
              type="button"
              onClick={() => setImageMode('upload')}
              className={`rounded-md px-3 py-1.5 text-xs transition ${
                imageMode === 'upload'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              Upload
            </button>

            <button
              type="button"
              onClick={() => setImageMode('url')}
              className={`rounded-md px-3 py-1.5 text-xs transition ${
                imageMode === 'url'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              URL
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-muted">
          {imageMode === 'upload' && preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : imageMode === 'url' && imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImagePlus className="h-8 w-8" />

              <p className="text-sm">Upload or paste image URL</p>
            </div>
          )}
        </div>

        {/* UPLOAD */}
        {imageMode === 'upload' && (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (selected) {
                setFile(selected);
              }
            }}
          />
        )}

        {/* URL */}
        {imageMode === 'url' && (
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/course-image.jpg"
          />
        )}
      </CardContent>
    </Card>
  );
};

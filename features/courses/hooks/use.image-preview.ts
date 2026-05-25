import { useMemo, useState } from 'react';

export const useImagePreview = () => {
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('url');

  const [file, setFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState('');

  const preview = useMemo(() => {
    if (!file) return null;

    return URL.createObjectURL(file);
  }, [file]);

  return {
    imageMode,
    setImageMode,
    file,
    setFile,
    imageUrl,
    setImageUrl,
    preview,
  };
};

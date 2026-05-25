import { useMemo, useState } from 'react';

export const useVideoPreview = () => {
  const [file, setFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;

    return URL.createObjectURL(file);
  }, [file]);

  return {
    file,
    setFile,
    previewUrl,
  };
};

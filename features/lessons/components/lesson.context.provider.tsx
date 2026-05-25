import { useMemo, useState } from 'react';
import { LessonContext } from '../context/lesson.context';
import { YouTubeMeta, Mode } from '../types/types';

export const LessonProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [mode, setMode] = useState<Mode>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [meta, setMeta] = useState<YouTubeMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const previewUrl = useMemo(() => {
    if (!file) return;
    return URL.createObjectURL(file);
  }, [file]) as string | null;

  const reset = () => {
    setFile(null);
    setUrl('');
    setLoading(false);
    setMode('upload');
  };

  return (
    <LessonContext.Provider
      value={{
        mode,
        setMode,
        file,
        setFile,
        url,
        setUrl,
        previewUrl,
        videoId,
        setVideoId,
        reset,
        meta,
        setMeta,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
};

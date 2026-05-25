import { createContext } from 'react';
import { YouTubeMeta, Mode } from '../types/types';

export type LessonContextType = {
  mode: Mode;
  setMode: (m: Mode) => void;

  file: File | null;
  setFile: (file: File | null) => void;

  url: string | null;
  setUrl: (url: string) => void;

  loading: boolean;
  setLoading: (load: boolean) => void;

  previewUrl: string | null;

  meta: YouTubeMeta | null;
  setMeta: (meta: YouTubeMeta | null) => void;

  videoId: string | null;
  setVideoId: (id: string | null) => void;

  error: boolean | null;
  setError: (error: boolean) => void;

  reset: () => void;
};

export const LessonContext = createContext<LessonContextType | null>(null);

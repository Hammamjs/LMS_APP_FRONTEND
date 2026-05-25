import { useEffect, useState } from 'react';

export const useFetchYoutubeMeta = (url: string, mode: 'upload' | 'link') => {
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (mode !== 'link') return;

    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&/]+)/,
    );

    const videoId = match?.[1];

    if (!videoId) {
      setMeta(null);
      return;
    }

    const fetchMeta = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );

        const json = await res.json();

        setMeta({
          title: json.title,
          thumbnail: json.thumbnail_url,
          author_name: json.author_name,
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMeta();
  }, [url, mode]);

  return {
    loading,
    meta,
    error,
  };
};

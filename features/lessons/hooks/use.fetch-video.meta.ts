import { useEffect } from 'react';
import { getYouTubeId } from '../lib/extract.id';
import { useLessonContext } from './use.lesson.context';

type FetchVideoProps = {
  mode: 'link' | 'upload';
};

export const useFetchVideoMetaData = () => {
  const {
    setUrl,
    setMeta,
    videoId,
    mode,
    setLoading,
    setError,
    url,
    setVideoId,
  } = useLessonContext();

  useEffect(() => {
    if (!videoId || mode !== 'link') return;

    const fetchVideo = async () => {
      setLoading(true);
      setError(false);
      setMeta(null);

      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );

        if (!res.ok) {
          throw new Error();
        }

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

    fetchVideo();
  }, [videoId, mode]);

  useEffect(() => {
    if (mode !== 'link') return;

    const id = getYouTubeId(url ?? '');

    if (!id) {
      setVideoId(null);
      setMeta(null);
      setError(false);

      return;
    }

    setVideoId(id);
  }, [url, mode]);
};

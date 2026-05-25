'use client';

import { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

interface FancyYoutubePlayerProps {
  url: string;
  title?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  url,
  title = 'YouTube Player',
  autoPlay = false,
}: FancyYoutubePlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [ready, setReady] = useState(false);

  const thumbnail = useMemo(() => {
    const videoId = extractYoutubeId(url);

    if (!videoId) return '';

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-red-500/20 via-pink-500/10 to-purple-500/20 opacity-50 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-zinc-400">Fancy YouTube Player</p>
        </div>

        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Player */}
      <div className="relative aspect-video w-full overflow-hidden">
        {!playing && (
          <>
            {/* Thumbnail */}
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlaying(true)}
              className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 shadow-2xl transition hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="ml-1 h-10 w-10"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </>
        )}

        <ReactPlayer
          src={url}
          width="100%"
          height="100%"
          playing={playing}
          controls
          onReady={() => setReady(true)}
          className="absolute inset-0"
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Extract YouTube video ID from URL
 */
function extractYoutubeId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[7].length === 11 ? match[7] : null;
}

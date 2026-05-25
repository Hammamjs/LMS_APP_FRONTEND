import { WatchDefaultValue } from 'react-hook-form';
import { getYoutubeEmbedUrl } from '../lib/get-embedded-url.helper';

type Props = {
  url: WatchDefaultValue<string>;
};

export const LivePreview = ({ url }: Props) => {
  return (
    url && (
      <div className="overflow-hidden rounded-xl border bg-black">
        <iframe
          className="aspect-video w-full"
          src={getYoutubeEmbedUrl(url)}
          title="Lesson video preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  );
};

export const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return '';

  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;

  const match = url.match(regExp);

  if (!match?.[1]) return '';

  return `https://www.youtube.com/embed/${match[1]}`;
};

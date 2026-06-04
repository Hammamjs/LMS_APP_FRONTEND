export const convertSlugHelper = (slug: string) =>
  slug
    .split('-')
    .map((w) => w.at(0)?.toUpperCase() + w.slice(1))
    .join(' ');

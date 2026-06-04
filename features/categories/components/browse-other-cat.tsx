import { Badge } from '@/shared/ui';
import Link from 'next/link';

type Props = {
  categories: string[];
  slug: string;
};

export const BrowseOtherCategories = ({ categories, slug }: Props) => {
  return (
    <div className="mt-12 border-t border-border/50 pt-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Explore Other Categories
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories
          .filter((cat) => cat !== slug)
          .map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`}
            >
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {cat}
              </Badge>
            </Link>
          ))}
      </div>
    </div>
  );
};

import Link from 'next/link';
import { Card, CardContent } from '@/shared/ui';
import { ArrowRight } from 'lucide-react';
import { ComponentType } from 'react';
import { categoryDescriptions } from '../config/category.config';

type categoryProps = {
  category: string;
  gradientClass: string;
  Icon: ComponentType<{
    className?: string;
  }>;
};

export const Category = ({ category, Icon, gradientClass }: categoryProps) => {
  return (
    <>
      <Link
        href={`/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`}
      >
        <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-border/50">
          {/* Category Header with Gradient */}
          <div className={`bg-linear-to-br ${gradientClass} p-6`}>
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm shadow-sm">
                <Icon className="h-7 w-7 text-primary" />
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {category}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
              {categoryDescriptions[category]}
            </p>

            {/* Top Course Preview */}
            {/* {topCourse && (
                        <div className="mt-4 rounded-lg bg-muted/50 p-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <BookOpen className="h-3 w-3" />
                            <span>Top Rated</span>
                          </div>
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {topCourse.title}
                          </p>
                        </div>
                      )} */}

            {/* Explore Link */}
            <div className="mt-4 flex items-center text-sm font-medium text-primary">
              Explore courses
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

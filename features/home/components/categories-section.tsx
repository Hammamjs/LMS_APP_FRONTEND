'use client';

import Link from 'next/link';
import {
  Code,
  Smartphone,
  Database,
  Brain,
  Palette,
  Briefcase,
  TrendingUp,
  Camera,
} from 'lucide-react';
import { Card, CardContent } from '@/shared/ui';
import { useCourseCategoriesQuery } from '@/features/courses/api/courses.api';

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  'Web Development': Code,
  'Mobile Development': Smartphone,
  'Data Science': Database,
  'Machine Learning': Brain,
  Design: Palette,
  Business: Briefcase,
  Marketing: TrendingUp,
  Photography: Camera,
};

export function CategoriesSection() {
  const { data: categories, isLoading } = useCourseCategoriesQuery();

  if (!categories?.length) return;

  if (isLoading) <>Loading ...</>;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Explore by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Find the perfect course in your area of interest
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Code;
            return (
              <Link
                key={category}
                href={`/courses?category=${encodeURIComponent(category)}`}
              >
                <Card className="group h-full transition-all duration-300 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-1 border-border/50">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Explore courses
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

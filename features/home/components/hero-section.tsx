'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Play, CheckCircle } from 'lucide-react';
import { Button, Input } from '@/shared/ui';

const benefits = [
  '15,000+ expert-led courses',
  'Learn at your own pace',
  'Lifetime access to content',
  'Certificate of completion',
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 via-background to-background py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Play className="h-4 w-4" />
            <span>2.5M+ learners worldwide</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Unlock Your Potential with{' '}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Expert-Led
            </span>{' '}
            Online Courses
          </h1>

          {/* Description */}
          <p className="mb-8 text-pretty text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Master new skills, advance your career, and explore your passions
            with thousands of courses taught by industry experts.
          </p>

          {/* Search Bar */}
          <form action={handleSearch} className="mx-auto mb-8 max-w-xl">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-base bg-background border-border shadow-sm"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8">
                Search
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

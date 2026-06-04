import { BookOpen, Users, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '20',
    label: 'Courses',
    description: 'Expert-created content',
  },
  {
    icon: Users,
    value: `${1}M+`,
    label: 'Learners',
    description: 'Worldwide community',
  },
  {
    icon: Award,
    value: `1M+`,
    label: 'Completions',
    description: 'Courses finished',
  },
  {
    icon: Globe,
    value: '180+',
    label: 'Countries',
    description: 'Global reach',
  },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Trusted by Millions of Learners
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join the world&apos;s largest online learning community
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-3xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 font-medium text-foreground">
                {stat.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

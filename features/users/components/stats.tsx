import { Card, CardContent } from '@/shared/ui';
import { LucideIcon } from 'lucide-react';

type statsProps = {
  stats: {
    icon: LucideIcon;
    label: string;
    value: string | number;
  }[];
};

export const Stats = ({ stats }: statsProps) => {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

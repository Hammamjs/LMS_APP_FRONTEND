'use client';
import { Star, BookOpen, Users, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  Input,
  Badge,
  Button,
} from '@/shared/ui';
import { useGetUsers } from '@/features/users/hooks';
import { InstructorStats } from './instructor.stats';

const instructors = [
  {
    name: 'Sarah Johnson',
    title: 'Senior Frontend Engineer',
    courses: 12,
    students: 24830,
    rating: 4.9,
    tags: ['React', 'TypeScript'],
  },
  {
    name: 'Marcus Lee',
    title: 'Full-Stack Architect',
    courses: 8,
    students: 15920,
    rating: 4.8,
    tags: ['Node.js', 'AWS'],
  },
  {
    name: 'Priya Patel',
    title: 'Product Designer',
    courses: 6,
    students: 9410,
    rating: 4.7,
    tags: ['Figma', 'UX'],
  },
  {
    name: 'David Chen',
    title: 'ML Engineer',
    courses: 5,
    students: 7280,
    rating: 4.8,
    tags: ['Python', 'AI'],
  },
  {
    name: 'Aisha Rahman',
    title: 'DevOps Lead',
    courses: 4,
    students: 5120,
    rating: 4.6,
    tags: ['Docker', 'K8s'],
  },
  {
    name: 'Tomás Rivera',
    title: 'Mobile Developer',
    courses: 7,
    students: 8930,
    rating: 4.7,
    tags: ['iOS', 'Swift'],
  },
];

export function InstructorsListComponent() {
  const { data: users, isLoading } = useGetUsers({ role: 'Instructor' });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex item-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Meet out instructors
          </h1>
          <p className="text-muted-foreground">
            Learn from world-class experts across design, engineering and
            business.
          </p>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search instructors…" className="pl-10" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((i) => (
          <Card key={i.name}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {i.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{i.name}</h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {i.title}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {i.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                <InstructorStats
                  icon={<BookOpen className="h-3.5 w-3.5" />}
                  label="Courses"
                  value={i.courses}
                />
                <InstructorStats
                  icon={<Users className="h-3.5 w-3.5" />}
                  label="Students"
                  value={i.students.toLocaleString()}
                />
                <InstructorStats
                  icon={
                    <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                  }
                  label="Rating"
                  value={i.rating}
                />
              </div>
              <Button variant="outline" className="mt-5 w-full">
                View profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

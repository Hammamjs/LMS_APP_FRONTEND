'use client';

import Link from 'next/link';
import { Plus, MoreVertical, Users, Star, Eye, Pencil } from 'lucide-react';
import {
  Input,
  Button,
  Card,
  CardContent,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { useParams } from 'next/navigation';

const courses = [
  {
    id: '1',
    title: 'Advanced React Patterns & Performance',
    status: 'Published',
    students: 1284,
    rating: 4.8,
    lessons: 42,
    price: '$79',
    cover: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: '2',
    title: 'TypeScript for Production Apps',
    status: 'Published',
    students: 932,
    rating: 4.7,
    lessons: 36,
    price: '$59',
    cover: 'from-indigo-500 to-purple-500',
  },
  {
    id: '3',
    title: 'Design Systems with Tailwind v4',
    status: 'Draft',
    students: 0,
    rating: 0,
    lessons: 12,
    price: '$49',
    cover: 'from-purple-500 to-pink-500',
  },
  {
    id: '4',
    title: 'Node.js & Edge Runtimes Masterclass',
    status: 'Published',
    students: 612,
    rating: 4.6,
    lessons: 28,
    price: '$69',
    cover: 'from-fuchsia-500 to-violet-600',
  },
];

export function InstructorCourses() {
  const { instructorId } = useParams();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage, edit and track performance of all your courses.
          </p>
        </div>

        <Button asChild>
          <Link href="instructor-courses/new">
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input placeholder="Search your courses…" className="sm:max-w-sm" />
        <Select defaultValue="all">
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0">
            <div
              className={`relative h-40 bg-linear-to-br ${c.cover}`}
              aria-hidden
            >
              <Badge
                variant={c.status === 'Published' ? 'default' : 'secondary'}
                className="absolute left-3 top-3"
              >
                {c.status}
              </Badge>
            </div>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold leading-tight">{c.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 h-8 w-8"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {c.students.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                  {c.rating || '—'}
                </span>
                <span>{c.lessons} lessons</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold text-primary">
                  {c.price}
                </span>
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

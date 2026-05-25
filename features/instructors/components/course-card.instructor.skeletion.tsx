import {
  Badge,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from '@/shared/ui';
import { MoreVertical } from 'lucide-react';

const CourseCardInstructorSkeleton = () => {
  return (
    <Card className="overflow-hidden p-0">
      {/* Image */}
      <div className="relative h-40">
        <Skeleton className="h-full w-full" />

        {/* Badge */}
        <div className="absolute left-3 top-3">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Title + Menu */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-[85%]" />
            <Skeleton className="h-5 w-[60%]" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-mr-2 h-8 w-8"
                disabled
              >
                <MoreVertical className="h-4 w-4 opacity-40" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Loading...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <Skeleton className="h-6 w-16" />

          <Button size="sm" variant="outline" disabled>
            <Skeleton className="h-4 w-14" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCardInstructorSkeleton;

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
} from '@/shared/ui';
import { Course } from '../types/course.types';

type InstructorInfoProps = { course: Course };

const InstructorInfo = ({ course }: InstructorInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={course.instructor.avatar || ''}
              alt={course.instructor.username}
            />
            <AvatarFallback className="text-2xl">
              {course.instructor?.username.charAt(0) ?? ''}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">
              {course.instructor.username}
            </h3>
            {/* <p className="text-muted-foreground">{course.instructor.title}</p> */}
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorInfo;

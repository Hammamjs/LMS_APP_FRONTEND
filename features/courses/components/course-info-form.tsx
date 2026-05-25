import { Card, CardContent, Input, Label, Textarea } from '@/shared/ui';

export const CourseInfoForm = () => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <Label>Lesson title</Label>

          <Input defaultValue="Understanding React Suspense" />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>

          <Textarea
            rows={8}
            defaultValue="Learn how React Suspense works internally."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Lesson order</Label>

            <Input type="number" defaultValue={1} />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>

            <Input type="number" defaultValue={0} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

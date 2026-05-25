import { Card, CardContent, Input, Label, Switch } from '@/shared/ui';

export const CourseSettings = () => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Free preview</Label>

            <p className="text-xs text-muted-foreground">
              Allow students to watch this lesson for free.
            </p>
          </div>

          <Switch />
        </div>

        <div className="space-y-2">
          <Label>Source link</Label>

          <Input placeholder="https://resource-link.com" defaultValue="" />

          <p className="text-xs text-muted-foreground">
            Optional downloadable resource or external source.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

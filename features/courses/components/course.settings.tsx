import { CardContent, Label, Switch } from '@/shared/ui';

export const CourseSettings = () => {
  return (
    <CardContent className="space-y-5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Label>Published</Label>

          <p className="text-xs text-muted-foreground">
            Make course visible to students
          </p>
        </div>

        <Switch defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label>Featured</Label>

          <p className="text-xs text-muted-foreground">
            Highlight course on homepage
          </p>
        </div>

        <Switch />
      </div>
    </CardContent>
  );
};

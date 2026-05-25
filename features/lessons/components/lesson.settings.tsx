import { Card, CardContent, Label, Switch } from '@/shared/ui';
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form';
import { TAddLessonSchema } from '../schema/add-lesson.schema';

type HasIsFree = {
  isFree: boolean;
};

type Props<T extends FieldValues & HasIsFree> = {
  setValue: UseFormSetValue<T>;
  isFree: boolean;
};

export const LessonSettings = <T extends FieldValues & HasIsFree>({
  isFree,
  setValue,
}: Props<T>) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="preview">Free preview</Label>

            <p className="text-xs text-muted-foreground">
              Allow non-enrolled students to watch.
            </p>
          </div>

          <Switch
            id="preview"
            checked={isFree}
            onCheckedChange={(checked) =>
              setValue('isFree' as Path<T>, checked as T[Path<T>])
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="downloads">Downloadable</Label>

            <p className="text-xs text-muted-foreground">
              Let students download the video.
            </p>
          </div>

          <Switch id="downloads" />
        </div>
      </CardContent>
    </Card>
  );
};

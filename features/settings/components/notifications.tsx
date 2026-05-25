import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Switch,
} from '@/shared/ui';
import { Bell } from 'lucide-react';

type Props = {
  emailNotifications: boolean;
  courseUpdates: boolean;
  marketingEmails: boolean;

  handleCoursUpdates: (checked: boolean) => void;
  handleMarketingEmails: (checked: boolean) => void;
  handleEmailNotifications: (checked: boolean) => void;
};

export const Notifications = ({
  emailNotifications,
  courseUpdates,
  marketingEmails,
  handleCoursUpdates,
  handleMarketingEmails,
  handleEmailNotifications,
}: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive email about your account activity
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={handleEmailNotifications}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="course-updates">Course Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when courses you&apos;re enrolled in are updated
            </p>
          </div>
          <Switch
            id="course-updates"
            checked={courseUpdates}
            onCheckedChange={handleCoursUpdates}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="marketing-emails">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new courses and promotions
            </p>
          </div>
          <Switch
            id="marketing-emails"
            checked={marketingEmails}
            onCheckedChange={handleMarketingEmails}
          />
        </div>
      </CardContent>
    </Card>
  );
};

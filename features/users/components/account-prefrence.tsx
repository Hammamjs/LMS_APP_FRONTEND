import { Card, CardHeader, CardTitle, CardContent, Button } from '@/shared/ui';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export const AccountPrefrence = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          Looking to update your password, toggle Two-Factor Authentication
          (2FA), manage global application notifications, or adjust security
          configurations?
        </p>
        <Button asChild variant="outline">
          <Link href="/settings">Go to Settings Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

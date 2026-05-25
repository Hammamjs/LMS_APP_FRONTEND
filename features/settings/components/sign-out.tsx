import { useLogOutMutationAction } from '@/features/auth/hooks/use.log-out';
import { Card, CardContent, Button } from '@/shared/ui';
import { LogOut } from 'lucide-react';

export const SignOut = () => {
  const { logout } = useLogOutMutationAction();
  return (
    <Card className="border-destructive/20">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <LogOut className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Sign Out</p>
            <p className="text-sm text-muted-foreground">
              Sign out of your account on this device
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

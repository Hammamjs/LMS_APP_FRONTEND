import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

type TwoFactorAuthenticationProps = {
  hideTwoFactor: () => void;
  handleToggleTwoFactor: () => void;
};

export const TwoFactorAuthenticationModal = ({
  handleToggleTwoFactor,
  hideTwoFactor,
}: TwoFactorAuthenticationProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-sm pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-150">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to modify your current security configuration
            and alter your security layer status?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={hideTwoFactor}>
              Decline
            </Button>
            <Button onClick={handleToggleTwoFactor}>Accept</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

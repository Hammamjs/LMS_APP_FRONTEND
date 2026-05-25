import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  Button,
  Separator,
} from '@/shared/ui';

import { DeleteAccountModal } from './delete-account.modal';
import { UpdatePasswordModal } from './update-password.modal';
import { TwoFactorAuthenticationModal } from './two-factor-auth';
import { Shield } from 'lucide-react';

type Props = {
  showPasswordModal: boolean;
  showTwoFactor: boolean;
  showDeleteModal: boolean;

  handleShowPassword: () => void;
  hideUpdatePasswordModal: () => void;
  handleShowTwoFactor: () => void;
  handleShowDeleteModal: () => void;
};

export const AccountOptions = ({
  handleShowPassword,
  handleShowTwoFactor,
  hideUpdatePasswordModal,
  showDeleteModal,
  showPasswordModal,
  handleShowDeleteModal,
  showTwoFactor,
}: Props) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account
        </CardTitle>
        <CardDescription>
          Manage your account settings and security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Change Password</p>
            <p className="text-sm text-muted-foreground">
              Update your password to keep your account secure
            </p>
          </div>
          <Button variant="outline" onClick={() => handleShowPassword}>
            Change
          </Button>
          {showPasswordModal && (
            <UpdatePasswordModal setShowModal={hideUpdatePasswordModal} />
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Button variant="outline" onClick={handleShowTwoFactor}>
            Enable
          </Button>
          {showTwoFactor && (
            <TwoFactorAuthenticationModal
              hideTwoFactor={handleShowPassword}
              handleToggleTwoFactor={handleShowPassword}
            />
          )}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-destructive">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive" onClick={handleShowDeleteModal}>
            Delete
          </Button>
          {showDeleteModal && (
            <DeleteAccountModal
              handleDeleteAccount={handleShowDeleteModal}
              hideDeleteModal={handleShowDeleteModal}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

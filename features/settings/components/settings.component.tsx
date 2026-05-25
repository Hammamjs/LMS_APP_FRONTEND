'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from '@/shared/ui';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { SignOut } from './sign-out';
import { AccountOptions } from './account-options';
import { UserAppearance } from './user-appearance';
import { useSettings } from '../hooks/use.settings.ui';
import { Globe } from 'lucide-react';
import { LanguagePrefrence } from './language-prefrence';
import { Notifications } from './notifications';

export function SettingsComponent() {
  const user = useSelector(selectCurrentUser);

  const {
    handleChangeLanguage,
    handleChangeTheme,
    language,
    theme,
    toggleSettings,
    settings,
  } = useSettings();

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Sign in to access settings
          </h1>
          <p className="mb-6 text-muted-foreground">
            Customize your learning experience and manage your account.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Settings</h1>

        {/* Appearance */}
        <UserAppearance theme={theme} handleSetThem={handleChangeTheme} />

        {/* Notifications */}
        <Notifications
          courseUpdates={settings.courseUpdates}
          emailNotifications={settings.emailNotifications}
          handleCoursUpdates={() => toggleSettings('courseUpdates')}
          handleMarketingEmails={() => toggleSettings('marketingEmails')}
          marketingEmails={settings.marketingEmails}
          handleEmailNotifications={() => toggleSettings('emailNotifications')}
        />

        {/* Language */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </CardTitle>
            <CardDescription>
              Set your preferred language and regional settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <LanguagePrefrence
                handleLanguage={handleChangeLanguage}
                language={language}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <AccountOptions
          handleShowDeleteModal={() => toggleSettings('showDeleteModal')}
          handleShowPassword={() => toggleSettings('showPasswordModal')}
          handleShowTwoFactor={() => toggleSettings('showTwoFactor')}
          hideUpdatePasswordModal={() => toggleSettings('showPasswordModal')}
          showDeleteModal={settings.showDeleteModal}
          showPasswordModal={settings.showPasswordModal}
          showTwoFactor={settings.showTwoFactor}
        />

        {/* Sign Out */}
        <SignOut />
      </div>
    </div>
  );
}

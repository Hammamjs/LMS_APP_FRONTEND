'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Calendar,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from '@/shared/ui';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/store/sign-in.store';
import { useGetUserEnrollment } from '@/features/courses/hooks/use.user.enrollment';
import { EditUserForm } from './edit-user.form';
import { ProfileAvatar } from './profile-avatar';
import { AccountPrefrence } from './account-prefrence';
import { Stats } from './stats';

export function ProfileComponent() {
  const user = useSelector(selectCurrentUser);
  const { data: userEnrollment } = useGetUserEnrollment();

  // Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Sign in to view your profile
          </h1>
          <p className="mb-6 text-muted-foreground">
            Manage your account and track your learning journey.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: userEnrollment?.data.length || 0,
    },
    { icon: Award, label: 'Certificates', value: 0 },
    {
      icon: Calendar,
      label: 'Member Since',
      value: new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    },
  ];

  const recentCourse = userEnrollment?.data?.[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <ProfileAvatar isEditing={isEditing} />

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="mt-1 flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                {user && !isEditing && (
                  <p className="mt-3 text-muted-foreground">{user.bio}</p>
                )}
              </div>

              {/* Edit Button */}
              <Button
                variant={isEditing ? 'ghost' : 'outline'}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <EditUserForm
                bio={bio}
                setBio={setBio}
                handleSave={handleSave}
                isSaving={isSaving}
                name={name}
                setName={setName}
                setIsEditing={setIsEditing}
              />
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Stats stats={stats} />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>
              Pick up right where you left off and keep expanding your skillset.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentCourse ? (
              <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">
                    {recentCourse.course?.title || 'Current Active Course'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Next up: Continue your pending lectures and assignments.
                  </p>
                </div>
                <Button asChild shrink-0="true">
                  <Link
                    href={`/courses/${recentCourse.course?.id || recentCourse.id}`}
                    className="gap-2"
                  >
                    Resume Course <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-border rounded-lg">
                <p className="text-sm text-muted-foreground mb-4">
                  You are not enrolled in any active courses at the moment.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/courses">Browse Catalog</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Preferences / Shortcuts Card */}
        <AccountPrefrence />
      </div>
    </div>
  );
}

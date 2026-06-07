'use client';
import {
  TUpdatePasswordSchema,
  UpdatePasswordSchema,
} from '@/features/auth/schema/update.password.validation';
import { useUpdatePassword } from '@/features/auth/hooks/use.update.password';
import { useCloseModal } from '@/features/settings/hooks/use.close-modal';
import { useToast } from '@/shared/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/shared/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const UpdatePasswordModal = ({
  setShowModal,
}: {
  setShowModal: () => void;
}) => {
  useCloseModal(setShowModal);

  const { updatePassword, isLoading } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdatePasswordSchema>({
    defaultValues: {
      newPassword: '',
      currentPassword: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: TUpdatePasswordSchema) => {
    const result = UpdatePasswordSchema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((e) => {
        toast({ title: e.message });
      });
      return;
    }

    try {
      const response = await updatePassword(result.data);
      toast({ title: response.message });

      reset();
    } catch (err) {
      console.log(err);
      toast({
        title: (err as any).data.message ?? 'Failed to update password',
      });
    }
  };

  return (
    <>
      (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <Card className="w-full max-w-md pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-150">
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...register('currentPassword')}
                  aria-invalid={!!errors.currentPassword}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register('newPassword')}
                  aria-invalid={!!errors.newPassword}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  aria-invalid={!!errors.confirmPassword}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost">
                  Decline
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Accept & Update
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
      )
    </>
  );
};

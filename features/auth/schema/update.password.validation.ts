import { z } from 'zod';

export const UpdatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase')
      .regex(/[a-z]/, 'Must contain at least one lowercase')
      .regex(/[0-9]/, 'Must contain at least one digit')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),

    currentPassword: z.string().min(1, 'Current password is required'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type TUpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;

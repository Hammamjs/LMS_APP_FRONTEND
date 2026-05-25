import z from 'zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'must be at least 8 characters')
      .regex(/[A-Z]/, 'Must be at least one uppercase letter')
      .regex(/[a-z]/, 'Must be at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    path: ['confirmPassword'],
    message: 'Password must matched',
  });

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

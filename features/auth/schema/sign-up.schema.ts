import { z } from 'zod';

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username should be at least contain 3 characters' }),
    bio: z
      .string()
      .min(3, { message: 'Bio should be at least contain 3 characters' })
      .nullable(),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Must include at least one uppercase letter',
      })
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must include at least one special characters'),
    email: z.string().email(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

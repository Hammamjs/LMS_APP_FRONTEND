import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

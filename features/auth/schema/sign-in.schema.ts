import { z } from 'zod';

export const SignInValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string(),
});

export type SignInValidationSchemaType = z.infer<typeof SignInValidationSchema>;

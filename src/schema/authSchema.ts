import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Terms & Conditions.",
  }),
});

export type SignUpCredentials = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export type SignInCredentials = z.infer<typeof SignInSchema>;

import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  phoneNumber: z.string().min(9, "Phone number is invalid").max(10, "Phone number is invalid"),
  email: z.string().email("Invalid email"),
  password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, "Password must have at least one number, one lower case, one upper case character and one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpRequest = z.infer<typeof SignUpSchema>;
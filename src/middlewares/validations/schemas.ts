import z from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "name must have at least 3 characters."),
  email: z.string().email("invalid email address."),
  password: z.string().min(6, "password must have at least 6 characters."),
});

export type User = z.infer<typeof userSchema>;

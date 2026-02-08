import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "name must have at least 3 characters."),
  email: z.string().email("invalid email address."),
  password: z.string().min(6, "password must have at least 6 characters."),
});

export const updateSchema = z.object({
  name: z.string().min(3, "name must have at least 3 characters.").optional(),
  email: z.string().email("invalid email address.").optional(),
  password: z
    .string()
    .min(6, "password must have at least 6 characters.")
    .optional(),
});

export const paramsIdSchema = z.object({
  id: z.string().min(1, "id is required."),
});

export type User = z.infer<typeof registerSchema>;

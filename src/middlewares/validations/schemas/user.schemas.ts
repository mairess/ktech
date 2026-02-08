import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UpdateUserRequestSchema = z
  .object({
    name: z
      .string()
      .min(3, "name must have at least 3 characters.")
      .optional()
      .openapi({ example: "Diego Cardoso" }),
    email: z
      .string()
      .email("invalid email address.")
      .optional()
      .openapi({ example: "diego@cardoso.com" }),
    password: z
      .string()
      .min(6, "password must have at least 6 characters.")
      .optional()
      .openapi({ example: "123456" }),
  })
  .openapi("UpdateUserRequest");

export const UserIdParamsSchema = z.object({
  id: z
    .string()
    .min(1, "id is required.")
    .openapi({ example: "60d0fe4f5311236168a109ca" }),
});

export const UserResponseSchema = z
  .object({
    _id: z.string().openapi({ example: "6988d0c22a6c625cc42fd774" }),
    name: z.string().openapi({ example: "Felipe Carlos" }),
    email: z.string().openapi({ example: "felipe@mail.com" }),
  })
  .openapi("UserResponse");

export const DeleteUserResponseSchema = z
  .object({
    message: z.string().openapi({ example: "User deleted successfully!" }),
  })
  .openapi("DeleteUserResponse");

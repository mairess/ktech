import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "name must have at least 3 characters.")
      .openapi({ example: "João Silva" }),
    email: z
      .string()
      .email("invalid email address.")
      .openapi({ example: "joao@ktech.com" }),
    password: z
      .string()
      .min(6, "password must have at least 6 characters.")
      .openapi({ example: "123456" }),
  })
  .openapi("RegisterPayload");

export const updateSchema = z
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
  .openapi("UpdateUser");

export const loginSchema = z.object({
  email: z
    .string()
    .email("invalid email address.")
    .openapi({ example: "joao@ktech.com" }),
  password: z
    .string()
    .min(6, "password must have at least 6 characters.")
    .openapi({ example: "123456" }),
});

export const TokenResponseSchema = z
  .object({
    token: z.string().openapi({
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODhkMGMyMmE2YzYyNWNjNDJmZDc3NCIsImVtYWlsIjoibWFpcmVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NzA1NzYyMTUsImV4cCI6MTc3MDY2MjYxNX0.fQjaB5yKqOQgLpEGW7kl5HW69UAcQecwR-CDaEVTQoo",
    }),
  })
  .openapi("TokenResponse");

export const InvalidCredentialErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Invalid email or password!" }),
  })
  .openapi("InvalidCredentialError");

export const ParamsIdSchema = z.string().meta({
  example: "60d0fe4f5311236168a109ca",
});

export const ValidationErrorRegisterAndUpdateSchema = z
  .object({
    message: z.array(z.string()).openapi({
      example: [
        "Name: name must have at least 3 characters.",
        "Email: Invalid input: expected string, received undefined",
        "Password: password must have at least 6 characters.",
      ],
    }),
  })
  .openapi("ValidationRegisterError");

export const ValidationErrorLoginSchema = z
  .object({
    message: z.array(z.string()).openapi({
      example: [
        "Email: invalid email address.",
        "Password: password must have at least 6 characters.",
      ],
    }),
  })
  .openapi("ValidationLoginError");

export const UserByIdSchema = z.object({
  _id: z.string().openapi({ example: "6988d0c22a6c625cc42fd774" }),
  name: z.string().openapi({ example: "Felipe Carlos" }),
  email: z.string().openapi({ example: "felipe@mail.comn" }),
});

export const UserNotFoundErrorSchema = z
  .object({
    message: z.string().openapi({ example: "User Not Found!" }),
  })
  .openapi("UserNotFoundError");

const TokenNotProvidedErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Token not provided!" }),
  })
  .openapi("TokenNotProvidedError");

const TokenMalFormedErrorSchema = z
  .object({
    message: z
      .string()
      .openapi({ example: "Token not provided or malformed!" }),
  })
  .openapi("TokenMalFormedError");

const InvalidTokenErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Token must be a valid token!" }),
  })
  .openapi("InvalidTokenError");

export const UnauthorizedErrorSchema = z
  .union([
    TokenNotProvidedErrorSchema,
    TokenMalFormedErrorSchema,
    InvalidTokenErrorSchema,
  ])
  .openapi("UnauthorizedError");

export const MeSchema = z.object({
  name: z.string().openapi({ example: "Maria Rita" }),
  email: z.email().openapi({ example: "maria@mail.com" }),
});

export const EmailInUseSchemaError = z.object({
  message: z
    .string()
    .openapi({ example: "Email already in use!" })
    .openapi("EmailInUserError"),
});

export const DeleteUserSchema = z
  .object({
    message: z.string().openapi({ example: "User deleted successfully!" }),
  })
  .openapi("DeleteUserResponse");

export type User = z.infer<typeof registerSchema>;

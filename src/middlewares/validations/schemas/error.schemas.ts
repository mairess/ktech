import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RegisterValidationErrorSchema = z
  .object({
    message: z.array(z.string()).openapi({
      example: [
        "Name: name must have at least 3 characters.",
        "Email: Invalid input: expected string, received undefined",
        "Password: password must have at least 6 characters.",
      ],
    }),
  })
  .openapi("RegisterValidationError");

export const LoginValidationErrorSchema = z
  .object({
    message: z.array(z.string()).openapi({
      example: [
        "Email: invalid email address.",
        "Password: password must have at least 6 characters.",
      ],
    }),
  })
  .openapi("LoginValidationError");

export const InvalidCredentialsErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Invalid email or password!" }),
  })
  .openapi("InvalidCredentialsError");

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

const TokenMalformedErrorSchema = z
  .object({
    message: z
      .string()
      .openapi({ example: "Token not provided or malformed!" }),
  })
  .openapi("TokenMalformedError");

const TokenInvalidErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Token must be a valid token!" }),
  })
  .openapi("TokenInvalidError");

export const UnauthorizedErrorSchema = z
  .union([
    TokenNotProvidedErrorSchema,
    TokenMalformedErrorSchema,
    TokenInvalidErrorSchema,
  ])
  .openapi("UnauthorizedError");

export const EmailInUseErrorSchema = z
  .object({
    message: z.string().openapi({ example: "Email already in use!" }),
  })
  .openapi("EmailInUseError");

import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const RegisterRequestSchema = z
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
  .openapi("RegisterRequest");

export const LoginRequestSchema = z
  .object({
    email: z
      .string()
      .email("invalid email address.")
      .openapi({ example: "joao@ktech.com" }),
    password: z
      .string()
      .min(6, "password must have at least 6 characters.")
      .openapi({ example: "123456" }),
  })
  .openapi("LoginRequest");

export const TokenResponseSchema = z
  .object({
    token: z.string().openapi({
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODhkMGMyMmE2YzYyNWNjNDJmZDc3NCIsImVtYWlsIjoibWFpcmVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NzA1NzYyMTUsImV4cCI6MTc3MDY2MjYxNX0.fQjaB5yKqOQgLpEGW7kl5HW69UAcQecwR-CDaEVTQoo",
    }),
  })
  .openapi("TokenResponse");

export const MeResponseSchema = z
  .object({
    name: z.string().openapi({ example: "Maria Rita" }),
    email: z.string().email().openapi({ example: "maria@mail.com" }),
  })
  .openapi("MeResponse");

export type User = z.infer<typeof RegisterRequestSchema>;

import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  registerSchema,
  ValidationErrorRegisterAndUpdateSchema,
  loginSchema,
  TokenResponseSchema,
  InvalidCredentialErrorSchema,
  ValidationErrorLoginSchema,
  UnauthorizedErrorSchema,
  UserNotFoundErrorSchema,
  MeSchema,
} from "../middlewares/validations/schemas";

export const authRegistry = new OpenAPIRegistry();

const bearerAuth = authRegistry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
);

authRegistry.registerPath({
  method: "post",
  path: "/auth",
  summary: "Register a user",
  tags: ["Auth"],
  request: {
    body: { content: { "application/json": { schema: registerSchema } } },
  },
  responses: {
    201: { description: "Created successfully" },
    400: {
      description: "Validation error",
      content: {
        "application/json": { schema: ValidationErrorRegisterAndUpdateSchema },
      },
    },
  },
});

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  summary: "Login",
  tags: ["Auth"],
  request: {
    body: { content: { "application/json": { schema: loginSchema } } },
  },
  responses: {
    200: {
      description: "Authenticated successfully",
      content: {
        "application/json": { schema: TokenResponseSchema },
      },
    },
    400: {
      description: "Validation error",
      content: { "application/json": { schema: ValidationErrorLoginSchema } },
    },
    401: {
      description: "Invalid credentials",
      content: {
        "application/json": { schema: InvalidCredentialErrorSchema },
      },
    },
  },
});

authRegistry.registerPath({
  method: "get",
  path: "/auth/me",
  summary: "My infos",
  tags: ["Auth"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: "Successfully get my infos",
      content: {
        "application/json": { schema: MeSchema },
      },
    },
    401: {
      description: "Unauthorized errors",
      content: {
        "application/json": {
          schema: UnauthorizedErrorSchema,
        },
      },
    },
    404: {
      description: "User not found",
      content: {
        "application/json": {
          schema: UserNotFoundErrorSchema,
        },
      },
    },
  },
});

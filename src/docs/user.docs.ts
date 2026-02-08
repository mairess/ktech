import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  UserByIdSchema,
  UnauthorizedErrorSchema,
  UserNotFoundErrorSchema,
  updateSchema,
  EmailInUseSchemaError,
  ValidationErrorRegisterAndUpdateSchema,
  DeleteUserSchema,
} from "../middlewares/validations/schemas";

export const userRegistry = new OpenAPIRegistry();

const bearerAuth = userRegistry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  summary: "Gets a user by its id",
  tags: ["User"],
  security: [{ [bearerAuth.name]: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "60d0fe4f5311236168a109ca",
      },
    },
  ],
  responses: {
    200: {
      description: "Successfully found",
      content: {
        "application/json": { schema: UserByIdSchema },
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

userRegistry.registerPath({
  method: "put",
  path: "/users/{id}",
  summary: "Updates user by its id",
  tags: ["User"],
  request: {
    body: { content: { "application/json": { schema: updateSchema } } },
  },
  security: [{ [bearerAuth.name]: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "60d0fe4f5311236168a109ca",
      },
    },
  ],
  responses: {
    200: {
      description: "Successfully updated",
      content: {
        "application/json": { schema: updateSchema },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: ValidationErrorRegisterAndUpdateSchema,
        },
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
    409: {
      description: "Email already in use",
      content: {
        "application/json": {
          schema: EmailInUseSchemaError,
        },
      },
    },
  },
});

userRegistry.registerPath({
  method: "delete",
  path: "/users/{id}",
  summary: "Deletes user by its id",
  tags: ["User"],
  security: [{ [bearerAuth.name]: [] }],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        example: "60d0fe4f5311236168a109ca",
      },
    },
  ],
  responses: {
    200: {
      description: "Successfully updated",
      content: {
        "application/json": { schema: DeleteUserSchema },
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

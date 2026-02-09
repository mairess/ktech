import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { authRegistry } from "./auth.docs";
import { userRegistry } from "./user.docs";

export function generateSwaggerDoc() {
  const corsOrigin = process.env.CORS_ORIGIN;
  if (!corsOrigin) {
    throw new Error("❌ CORS_ORIGIN is not defined, impossible generate docs.");
  }

  const servers = corsOrigin.split(",").map((url) => ({
    url: url.trim(),
  }));

  const registry = new OpenAPIRegistry([authRegistry, userRegistry]);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "KTech API",
      version: "1.0.0",
      description: "Documentação da API KTech usando Zod e Swagger",
    },
    servers,
  });
}

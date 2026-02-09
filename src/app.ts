import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { connection } from "./database/connection";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerDoc } from "./docs";

if (!process.env.CORS_ORIGIN) {
  throw new Error("CORS_ORIGIN not defined!");
}

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", true);
    this.app.use(cors(this.corsOptions()));
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(generateSwaggerDoc()),
    );
    this.config();
    this.routes();
    this.app.use(errorHandlerMiddleware);
  }

  private corsOptions(): cors.CorsOptions {
    const origins = process.env.CORS_ORIGIN!.split(",").map((o) => o.trim());

    return {
      origin: origins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    };
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(router);
  }

  public async start(PORT: string): Promise<void> {
    try {
      await connection();
      this.app.listen(PORT, () =>
        console.info(`🚀 Server is up and running on localhost:${PORT}.`),
      );
    } catch (error) {
      console.error("❌ Failed to start Server:", error);
      process.exit(1);
    }
  }
}

import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { connection } from "./database/connection";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerDoc } from "./docs";

const swaggerDoc = generateSwaggerDoc();

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors(this.corsOptions()));
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.config();
    this.routes();
    this.app.use(errorHandlerMiddleware);
  }

  private corsOptions(): cors.CorsOptions {
    return {
      origin: process.env.CORS_ORIGIN,
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

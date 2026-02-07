import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { connection } from "./database/connection";

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    this.routes();
    this.app.get("/", (req, res) => res.json({ message: "Server is up!" }));
    this.app.use(errorHandlerMiddleware);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH",
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use(router);
  }

  public async start(PORT: string): Promise<void> {
    try {
      await connection();
      this.app.listen(PORT, () =>
        console.info(`🚀 Server is up and Running on localhost:${PORT}`),
      );
    } catch (error) {
      console.error("❌ Failed to start app:", error);
      process.exit(1);
    }
  }
}

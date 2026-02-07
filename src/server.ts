import "dotenv";
import { App } from "./app";

const PORT = process.env.APP_PORT;

if (!PORT) {
  throw new Error("PORT is not defined, impossible start server.");
}

await new App().start(PORT);

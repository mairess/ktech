import "dotenv/config";
import { App } from "./app";

const PORT = process.env.APP_PORT;

if (!PORT) {
  throw new Error("PORT is not defined, impossible to start server.");
}

new App().start(PORT).catch((error) => {
  console.error("Error ao startar o server:", error);
  process.exit(1);
});

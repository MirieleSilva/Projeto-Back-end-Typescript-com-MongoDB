// src/server.ts
import { config } from "./config";
import app from "./app";
import { connectMongo } from "./infra/mongo/connection";
import { seedIfNeeded } from "./routes/_wire";

async function bootstrap() {
  const dataLayer = process.env.DATA_LAYER ?? "mongo";
  console.log(`[boot] DATA_LAYER=${dataLayer}`);

  if (dataLayer === "mongo") {
    console.log("[boot] connecting to Mongo...", process.env.MONGO_URI);
    await connectMongo();      
    await seedIfNeeded();      
    console.log("[boot] mongo ready");
  }

  app.listen(config.port, () => {
    console.log(`API running on http://localhost:${config.port}`);
  });
}

bootstrap().catch((e) => {
  console.error("Failed to start:", e);
  process.exit(1);
});

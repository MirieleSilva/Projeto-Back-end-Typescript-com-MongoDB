import mongoose from "mongoose";

export async function connectMongo() {
  const uri = process.env.MONGO_URI!;
  const db  = process.env.MONGO_DB!;
  if (!uri || !db) throw new Error("MONGO_URI/MONGO_DB não definidos");

  if (mongoose.connection.readyState === 1) return mongoose.connection;

  mongoose.connection.on("connected", () => console.log("[mongo] connected"));
  mongoose.connection.on("error", (err) => console.error("[mongo] error:", err));
  mongoose.connection.on("disconnected", () => console.log("[mongo] disconnected"));

  await mongoose.connect(uri, {
    dbName: db,
    serverSelectionTimeoutMS: 10000,
    directConnection: true,
  });

  return mongoose.connection;
}

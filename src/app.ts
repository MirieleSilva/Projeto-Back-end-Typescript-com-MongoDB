import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./routes/auth.routes";
import perfumeRoutes from "./routes/perfume.routes";
import estoqueRoutes from "./routes/estoque.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/perfumes", perfumeRoutes);
app.use("/estoque", estoqueRoutes);

app.use(errorHandler);

export default app;

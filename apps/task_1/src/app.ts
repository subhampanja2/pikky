import express, { Application } from "express";
import bunyan from "bunyan";
import foodRouter from "./routers/foodRouter";
import healthCheckRouter from "./routers/healthCheckRouter";
import rateLimit from "express-rate-limit";

const log = bunyan.createLogger({
  name: "food-api",
  streams: [{ path: "./logs/food-api.log" }],
});
export const app: Application = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

app.use(limiter);
app.use(express.json());
app.use("/api/foods", foodRouter);
app.use("/api/health", healthCheckRouter);

const PORT: number = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`);
});

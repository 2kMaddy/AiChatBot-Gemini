import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cros from "cors";
import appRouter from "./routes/index.js";
config();
const app = express();
// middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cros());
// remove in production
app.use(morgan("dev"));
app.use("/api", appRouter);
export default app;
//# sourceMappingURL=app.js.map
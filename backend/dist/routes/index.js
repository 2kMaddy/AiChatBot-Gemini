import { Router } from "express";
import { verifyToken } from "../utils/tokenManager.js";
import userRoutes from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chat", verifyToken, chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map
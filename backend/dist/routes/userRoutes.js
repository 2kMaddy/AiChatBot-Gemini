import { Router } from "express";
import { getAllUsers, userSignup, userLogin, userDeletion, } from "../controllers/userController.js";
const userRoutes = Router();
userRoutes.get("/get-all-users", getAllUsers);
userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);
userRoutes.delete("/delete/:id", userDeletion);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map
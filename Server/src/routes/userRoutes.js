import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutController,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);

export default userRouter;

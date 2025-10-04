import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutController,
  getuserController,
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutController);
userRouter.get("/user-details", auth, getuserController);

export default userRouter;

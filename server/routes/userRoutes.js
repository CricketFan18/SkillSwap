import express from "express";
import { addUser, login, logout } from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validators/userSchema.js";

const router = express.Router();

router.post("/register", validate(userSchema), addUser);

router.post("/login", validate(userSchema), login);

router.post("/logout", authenticate, logout);

export default router;

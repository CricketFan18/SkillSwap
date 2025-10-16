import express from "express";
import { addUser, login, logout } from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", addUser);

router.post("/login", login);

router.post("/logout", authenticate, logout);

export default router;
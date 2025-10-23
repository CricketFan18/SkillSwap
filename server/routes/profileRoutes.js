import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  removeSkill,
  addSkill,
  deleteProfile,
  getProfileById,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.put("/update", authenticate, updateProfile);

router.delete("/delete", authenticate, deleteProfile);

router.get("/:id", authenticate, getProfileById);

router.put("/add-skill", authenticate, addSkill);

router.put("/remove-skill", authenticate, removeSkill);

export default router;

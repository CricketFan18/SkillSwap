import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { profileSchema } from "../validators/profileSchema.js";
import { validate } from "../middlewares/validate.js";
import {
  removeSkill,
  addSkill,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.put("/update", authenticate, validate(profileSchema),  updateProfile);

router.delete("/delete", authenticate, deleteProfile);

router.get("/:id", authenticate, getProfile);

router.put("/add-skill", authenticate, validate(profileSchema), addSkill);

router.put("/remove-skill", authenticate, validate(profileSchema), removeSkill);

export default router;

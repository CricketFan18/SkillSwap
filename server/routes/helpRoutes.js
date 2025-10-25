import express from "express";
import { helpSchema } from "../validators/helpSchema.js";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createHelpPost,
  deleteHelpPost,
  getAllPosts,
  getHelpPosts,
  getPostByID,
  updateHelpPost,
} from "../controllers/helpController.js";

const router = express.Router();


router.get("/all", authenticate, getAllPosts);

router.post("/create", authenticate, validate(helpSchema), createHelpPost);

router.patch("/update/:id", authenticate, validate(helpSchema), updateHelpPost);

router.get("/:id", authenticate, getPostByID);

router.delete("/:id", authenticate, deleteHelpPost);

router.get("/", authenticate, getHelpPosts);

export default router;

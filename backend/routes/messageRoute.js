import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createMessage,
  getAllMessage,
  deleteMessage,
  markAsRead,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, getAllMessage);
router.put("/:id", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

export default router;

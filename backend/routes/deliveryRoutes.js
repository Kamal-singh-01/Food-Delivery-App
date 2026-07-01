import express from "express";
import { getDeliveryBoy } from "../controllers/deliveryController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,getDeliveryBoy);

export default router;


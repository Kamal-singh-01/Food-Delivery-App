import express from 'express'
import { placeOrder , getMyOrders , updateOrderStatus , getAllOrders } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/", protect , placeOrder);
router.get("/my" , protect , getMyOrders);
router.get("/" , protect ,getAllOrders);
router.put("/:id" , protect , updateOrderStatus);

export default router;
import express from 'express'
import { placeOrder , getMyOrders , updateOrderStatus , getAllOrders , assignDeliveryBoy , getAssignedOrders } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/", protect , placeOrder);
router.get("/my" , protect , getMyOrders);
router.get('/assigned', protect, getAssignedOrders);
router.get("/" , protect ,getAllOrders);
router.put("/:id" , protect , updateOrderStatus);
router.put('/:id/assign', protect, assignDeliveryBoy); 

export default router;
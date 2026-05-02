import express from 'express';
import { getAllFoods, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foodController.js';
import { upload } from '../config/cloudinary.js';
import protect from '../middleware/authMiddleware.js';

const router   = express.Router();

router.get('/',getAllFoods);
router.get('/:id' , getFoodById);
router.post('/', protect, upload.single('image'), addFood);
router.delete('/:id', protect, deleteFood);

export default router;
import express from 'express';
import { getAllFood, getFoodsByCategory, deleteFood ,addFood} from '../controllers/foodController.js';
import { upload } from '../config/cloudinary.js';
import protect from '../middleware/authMiddleware.js';

const router   = express.Router();

router.get('/',getAllFood);
router.get('/:id' , getFoodsByCategory);
router.post('/', protect, upload.single('image'), addFood);
router.delete('/:id', protect, deleteFood);

export default router;
import express from 'express';
import { getUserProfile, getWishlist, addToWishlist } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/wishlist').get(protect, getWishlist);
router.route('/wishlist/:productId').post(protect, addToWishlist);

export default router;

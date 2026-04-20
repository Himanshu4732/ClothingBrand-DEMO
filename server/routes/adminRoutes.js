import express from 'express';
import { getDashboardStats, getCoupons } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/dashboard').get(protect, admin, getDashboardStats);
router.route('/coupons').get(protect, admin, getCoupons);

export default router;

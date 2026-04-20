import express from 'express';
import { getProducts, getProductBySlug } from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:slug').get(getProductBySlug);

export default router;

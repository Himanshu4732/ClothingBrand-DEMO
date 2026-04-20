import express from 'express';
import { addOrderItems, createPaymentIntent, stripeWebhook } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addOrderItems); // Could add conditional protection for guests
router.post('/create-payment-intent', createPaymentIntent);

// Note: Stripe Webhook needs raw body, not JSON.
// Will configure express.raw in server.js just for this path.
router.post('/stripe-webhook', express.raw({type: 'application/json'}), stripeWebhook);

export default router;

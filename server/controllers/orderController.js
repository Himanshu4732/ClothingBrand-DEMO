import Order from '../models/Order.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private / Public (Guest)
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    guestEmail
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // Map frontend cart items matching Order Item schema
    const items = orderItems.map(item => ({
      product: item.product,
      size: item.size,
      color: item.color,
      qty: item.qty,
      price: item.price,
      image: item.image
    }));

    const orderParams = {
      items,
      shippingAddress,
      paymentMethod,
      shippingCost: shippingPrice,
      subtotal: itemsPrice,
      total: totalPrice,
    };

    if (req.user) {
        orderParams.user = req.user._id;
    } else if (guestEmail) {
        orderParams.guestEmail = guestEmail;
    } else {
        return res.status(400).json({ message: 'Must provide user or guest email' });
    }

    const order = new Order(orderParams);
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};

// @desc    Create Stripe Payment Intent
// @route   POST /api/orders/create-payment-intent
// @access  Public
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: 'usd',
      metadata: { orderId: orderId }
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Stripe Webhook
// @route   POST /api/orders/stripe-webhook
// @access  Public
export const stripeWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Find order based on metadata and update it
    if (paymentIntent.metadata.orderId) {
       const order = await Order.findById(paymentIntent.metadata.orderId);
       if (order) {
          order.paymentStatus = 'paid';
          order.stripePaymentIntentId = paymentIntent.id;
          order.orderStatus = 'processing';
          await order.save();
       }
    }
  }

  res.status(200).end();
};

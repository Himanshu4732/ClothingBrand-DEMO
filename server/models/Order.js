import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return !this.guestEmail; }
  },
  guestEmail: {
    type: String,
    required: function() { return !this.user; }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    image: { type: String }
  }],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  shippingMethod: { type: String, enum: ['Standard', 'Express', 'Same Day'], default: 'Standard' },
  shippingCost: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponApplied: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  stripePaymentIntentId: String,
  orderStatus: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  trackingNumber: String,
  trackingUrl: String,
  invoiceUrl: String,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);

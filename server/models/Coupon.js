import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minOrderValue: {
    type: Number,
    default: 0,
  },
  maxDiscount: {
    type: Number,
  },
  usageLimit: {
    type: Number,
    default: null, // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);

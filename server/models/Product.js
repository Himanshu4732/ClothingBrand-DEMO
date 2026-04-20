import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    default: 'VOIDHAUS',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: String,
  images: [{
    public_id: String,
    url: String,
  }],
  video: {
    public_id: String,
    url: String,
  },
  variants: [{
    color: String,
    colorHex: String,
    sizes: [{
      size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] },
      stock: { type: Number, default: 0 },
      sku: String,
    }]
  }],
  price: {
    type: Number,
    required: true,
  },
  compareAtPrice: Number,
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 },
  seoTitle: String,
  seoDescription: String,
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  const { productId, rating, title, body } = req.body;

  try {
    const product = await Product.findById(productId);

    if (product) {
      const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed by you.');
      }

      // Check if verified purchase
      const hasPurchased = await Order.findOne({ 
          user: req.user._id, 
          'items.product': productId, 
          paymentStatus: 'paid' 
      });

      const review = new Review({
        product: productId,
        user: req.user._id,
        rating: Number(rating),
        title,
        body,
        isVerifiedPurchase: !!hasPurchased,
      });

      await review.save();

      // Update product rating counts
      const reviews = await Review.find({ product: productId });
      product.numReviews = reviews.length;
      product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
   try {
     const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name avatar');
     res.json(reviews);
   } catch(error) {
     res.status(500).json({ message: error.message });
   }
};

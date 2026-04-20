import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      addresses: user.addresses,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist', 'name price images slug');
  
  if (user) {
    res.json(user.wishlist);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
export const addToWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  const product = await Product.findById(req.params.productId);

  if (user && product) {
    if (!user.wishlist.includes(product._id)) {
      user.wishlist.push(product._id);
      await user.save();
    }
    res.json({ message: 'Added to wishlist' });
  } else {
    res.status(404).json({ message: 'User or product not found' });
  }
};

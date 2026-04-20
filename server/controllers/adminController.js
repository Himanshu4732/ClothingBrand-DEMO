import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    // Calculate total revenue from paid orders
    const paidOrders = await Order.find({ paymentStatus: 'paid' });
    const totalRevenue = paidOrders.reduce((acc, order) => acc + order.total, 0);

    // Mock recent revenue chart data (last 7 days for demo)
    const revenueData = [
       { name: 'Mon', revenue: 400 },
       { name: 'Tue', revenue: 300 },
       { name: 'Wed', revenue: 550 },
       { name: 'Thu', revenue: 200 },
       { name: 'Fri', revenue: 800 },
       { name: 'Sat', revenue: 1200 },
       { name: 'Sun', revenue: 950 },
    ];

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      revenueData,
      conversionRate: '4.2%' // Mocked for UI purposes
    });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons
// @route   GET /api/admin/coupons
// @access  Private/Admin
export const getCoupons = async (req, res) => {
   const coupons = await Coupon.find({});
   res.json(coupons);
};

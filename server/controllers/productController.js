import Product from '../models/Product.js';

// @desc    Fetch all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    // Filters
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    } : {};
    
    // Additional filters like category, color, size can go here
    let filter = { ...keyword };
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Sorting
    let sort = {};
    if (req.query.sort) {
      const parts = req.query.sort.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      sort = { createdAt: -1 }; // Default new arrivals
    }

    const count = await Product.countDocuments({ ...filter });
    const products = await Product.find({ ...filter })
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

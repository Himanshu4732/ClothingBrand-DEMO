import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// User must be authenticated
export const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no cookie, try bearer token for general API usage
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, access token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

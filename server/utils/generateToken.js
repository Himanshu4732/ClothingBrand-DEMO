import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const payload = { userId };
  
  // Access Token (short lived)
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m'
  });

  // Refresh Token (long lived)
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh_secret', {
    expiresIn: '7d'
  });

  // Set Refresh Token in HttpOnly cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return accessToken; // Return access token to client
};

export default generateToken;

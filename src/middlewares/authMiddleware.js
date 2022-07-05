const jwt = require('jsonwebtoken');
const { unauthorized } = require('../constants/statusCodeTypes');

const { JWT_SECRET } = process.env;

const notFoundError = {
  code: unauthorized,
  message: 'Token not found',
};

const invalidToken = {
  code: unauthorized,
  message: 'Expired or invalid token',
};

const validateToken = async (req, _res, next) => {
  const token = req.headers.authorization;
  console.log('Token :', token);
  if (!token) { return next(notFoundError); }
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (_err) {
    return next(invalidToken);
  }
};

module.exports = {
  validateToken,
};

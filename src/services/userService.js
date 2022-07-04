const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { isInvalid } = require('../constants/statusCodeTypes');

const { JWT_SECRET } = process.env;

const userLoginError = {
  code: isInvalid,
  message: 'Invalid fields',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

const verifyLogin = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) { return ({ error: userLoginError }); }

  const payload = {
    id: user.id,
    email,
  };

  const token = generateToken(payload);

  return ({ token });
};

module.exports = {
  verifyLogin,
};

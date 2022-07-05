const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { isInvalid, alreadyExists } = require('../constants/statusCodeTypes');

const { JWT_SECRET } = process.env;

const userLoginError = {
  code: isInvalid,
  message: 'Invalid fields',
};

const userRegistrationError = {
  code: alreadyExists,
  message: 'User already registered',
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

const create = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) { return ({ error: userRegistrationError }); }

  const newUser = await User.create({ displayName, email, password, image });
  const payload = {
    id: newUser.id,
    email,
  };

  const token = generateToken(payload);
  return ({ token });
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  const editedUsers = users.map((user) => {
    const { id, displayName, email, image } = user;
    return ({ id, displayName, email, image });
  });

  return (editedUsers);
};

module.exports = {
  verifyLogin,
  create,
  getAll,
};

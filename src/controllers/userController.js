const userService = require('../services/userService');
const { CREATED } = require('../constants/statusCodes');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.create(displayName, email, password, image);
  if (token.error) { return next(token.error); }

  return res.status(CREATED).json(token);
};

module.exports = {
  create,
};
const userService = require('../services/userService');
const { CREATED, OK } = require('../constants/statusCodes');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.create(displayName, email, password, image);
  if (token.error) { return next(token.error); }

  return res.status(CREATED).json(token);
};

const getAll = async (_req, res, _next) => {
  const users = await userService.getAll();
  return res.status(OK).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  if (user.error) { return next(user.error); }

  return res.status(OK).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};

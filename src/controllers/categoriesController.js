const categoriesService = require('../services/categoriesService');
const { OK, CREATED } = require('../constants/statusCodes');

const getAll = async (_req, res, _next) => {
  const categories = await categoriesService.getAll();
  return res.status(OK).json(categories);
};

const create = async (req, res, _next) => {
  const { name } = req.body;
  const category = await categoriesService.create(name);

  return res.status(CREATED).json(category);
};

module.exports = {
  getAll,
  create,
};

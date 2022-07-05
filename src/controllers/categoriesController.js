const categoriesService = require('../services/categoriesService');
const { OK } = require('../constants/statusCodes');

const getAll = async (_req, res, _next) => {
  const categories = await categoriesService.getAll();
  return res.status(OK).json(categories);
};

module.exports = {
  getAll,
};

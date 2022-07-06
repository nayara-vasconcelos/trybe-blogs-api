const postService = require('../services/postService');
const { OK } = require('../constants/statusCodes');

const getAll = async (_req, res, _next) => {
  const posts = await postService.getAll();
  return res.status(OK).json(posts);
};

module.exports = {
  getAll,
};

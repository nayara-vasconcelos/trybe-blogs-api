const postService = require('../services/postService');
const { OK } = require('../constants/statusCodes');

const getAll = async (_req, res, _next) => {
  const posts = await postService.getAll();
  return res.status(OK).json(posts);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getById(id);
  if (post.error) { return next(post.error); }

  return res.status(OK).json(post);
};

module.exports = {
  getAll,
  getById,
};

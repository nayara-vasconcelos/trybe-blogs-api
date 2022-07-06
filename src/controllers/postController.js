const postService = require('../services/postService');
const { OK, NO_CONTENT } = require('../constants/statusCodes');

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

const deleteById = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const result = await postService.deleteById(postId, userId);
  if (result.error) { return next(result.error); }

  return res.status(NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  deleteById,
};

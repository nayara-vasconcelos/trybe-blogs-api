const { BlogPost, User, Category } = require('../database/models');
const { notFound, unauthorized } = require('../constants/statusCodeTypes');

const postNotFoundError = {
  code: notFound,
  message: 'Post does not exist',
};

const unauthorizedUserError = {
  code: unauthorized,
  message: 'Unauthorized user',
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return (posts);
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id: parseInt(id, 10) },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) { return ({ error: postNotFoundError }); }

  return (post);
};

const deleteById = async (postId, userId) => {
  const post = await BlogPost.findByPk(parseInt(postId, 10));
  if (!post) { return ({ error: postNotFoundError }); }
  if (post.userId !== userId) { return ({ error: unauthorizedUserError }); }

  const result = await BlogPost.destroy({
    where: { id: parseInt(postId, 10) },
  });
  if (!result) { return ({ error: { message: 'Database Error' } }); }

  return false;
};

module.exports = {
  getAll,
  getById,
  deleteById,
};

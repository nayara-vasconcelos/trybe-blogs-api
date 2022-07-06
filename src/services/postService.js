const { BlogPost, User, Category } = require('../database/models');
const { notFound } = require('../constants/statusCodeTypes');

const postNotFoundError = {
  code: notFound,
  message: 'Post does not exist',
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

module.exports = {
  getAll,
  getById,
};

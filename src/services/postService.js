const Sequelize = require('sequelize');
const config = require('../database/config/config');

const { BlogPost, User, Category, PostCategory } = require('../database/models');
const { notFound, unauthorized, isInvalid } = require('../constants/statusCodeTypes');

const sequelize = new Sequelize(config.development);

const postNotFoundError = {
  code: notFound,
  message: 'Post does not exist',
};

const unauthorizedUserError = {
  code: unauthorized,
  message: 'Unauthorized user',
};

const invalidCategoryError = {
  code: isInvalid,
  message: '"categoryIds" not found',
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

const verifyCategories = async (categoryIds) => {
  const categories = await Promise.all(categoryIds
    .map((categoryId) => Category.findByPk(categoryId)));

  const verifiedIds = categories.filter((existentCategory) => existentCategory !== null)
    .map((category) => category.id);

  return (verifiedIds);
};

const create = async (userId, title, content, categoryIds) => {
  const verifiedCategoryIds = await verifyCategories(categoryIds);
  if (verifiedCategoryIds.length === 0) { return ({ error: invalidCategoryError }); }
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost.create({ title, content, userId }, { transaction: t });
    await Promise.all(
      verifiedCategoryIds.map((categoryId) => (
        PostCategory.create({ postId: post.id, categoryId }, { transaction: t })
      )),
    );
    await t.commit();
    return (post);
  } catch (error) {
    await t.rollback();
    return ({ error: { message: 'Transaction Error' } });
  }
};

const verifyPostUpdate = async (postId, userId) => {
  const post = await BlogPost.findByPk(parseInt(postId, 10));

  if (!post) { return ({ error: postNotFoundError }); }
  if (post.userId !== userId) { return ({ error: unauthorizedUserError }); }

  return false;
};

// Ref: https://stackoverflow.com/questions/28414395/how-to-update-with-sequelize-with-now-on-a-timestamp
// Resposta do usuário "Arthur Mastropietro"
const update = async (userId, postId, title, content) => {
  const error = await verifyPostUpdate(postId, userId);
  if (error) { return (error); }

  const result = await BlogPost.update(
    { title, content, updated: sequelize.literal('CURRENT_TIMESTAMP') },
    { where: { id: parseInt(postId, 10) } },
  );
  if (!result) { return ({ error: { message: 'Database Error' } }); }

  const updatedPost = await BlogPost.findOne({
    where: { id: parseInt(postId, 10) },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

module.exports = {
  getAll,
  getById,
  deleteById,
  create,
  update,
};

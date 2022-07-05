const { Category } = require('../database/models');

const getAll = async () => {
  const categories = await Category.findAll();
  // const editedCategories = categories.map((category) => {
  //   const { id, name } = category;
  //   return ({ id, name });
  // });

  return (categories);
};

const create = async (name) => {
  const category = await Category.create({ name });
  // const newCategory = { id: category.id, name: category.name };

  return (category);
};

module.exports = {
  getAll,
  create,
};

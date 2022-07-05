const { Category } = require('../database/models');

const getAll = async () => {
  const categories = await Category.findAll();
  // const editedCategories = categories.map((category) => {
  //   const { id, name } = category;
  //   return ({ id, name });
  // });

  return (categories);
};

module.exports = {
  getAll,
};

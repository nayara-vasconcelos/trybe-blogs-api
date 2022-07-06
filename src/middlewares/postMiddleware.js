const { createPostSchema, updatePostSchema } = require('../schemas/postSchema');
const { isInvalid } = require('../constants/statusCodeTypes');

const invalidFieldsError = {
  code: isInvalid,
  message: 'Some required fields are missing',
};

const validatePost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.params;

  if (!id) {
    const { error } = createPostSchema.validate({ title, content, categoryIds });
    if (error) { return next(invalidFieldsError); }
    return next();
  }

  const { error } = updatePostSchema.validate({ title, content });
  if (error) { return next(invalidFieldsError); }

  next();
};

module.exports = {
  validatePost,
};

const postSchema = require('../schemas/postSchema');
const { isInvalid } = require('../constants/statusCodeTypes');

const invalidFieldsError = {
  code: isInvalid,
  message: 'Some required fields are missing',
};

const validatePost = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = postSchema.validate({ title, content, categoryIds });
  if (error) { return next(invalidFieldsError); }

  next();
};

module.exports = {
  validatePost,
};

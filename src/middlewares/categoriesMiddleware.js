const { isInvalid } = require('../constants/statusCodeTypes');
const categorySchema = require('../schemas/categorySchema');

const validateCategory = (req, _res, next) => {
  const { name } = req.body;
  const { error } = categorySchema.validate({ name });

  if (error) {
    return next({ code: isInvalid, message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateCategory,
};

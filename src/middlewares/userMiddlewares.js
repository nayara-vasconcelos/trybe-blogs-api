const userSchema = require('../schemas/userSchema');
const { isInvalid } = require('../constants/statusCodeTypes');

const validateUser = (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) { return next({ code: isInvalid, message: error.details[0].message }); }

  next();
};

module.exports = {
  validateUser,
};

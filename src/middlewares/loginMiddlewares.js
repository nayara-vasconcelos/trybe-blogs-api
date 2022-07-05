const { isInvalid } = require('../constants/statusCodeTypes');
const loginSchema = require('../schemas/loginSchema');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return next({ code: isInvalid, message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateLogin,
};

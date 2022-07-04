const userService = require('../services/userService');
const { OK } = require('../constants/statusCodes');

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await userService.verifyLogin(email, password);
  if (token.error) { return next(token.error); }

  return res.status(OK).json(token);
};

module.exports = {
  signIn,
};

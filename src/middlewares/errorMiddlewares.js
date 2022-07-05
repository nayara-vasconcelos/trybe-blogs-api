const {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} = require('../constants/statusCodes');

const statusByErrorCode = {
  alreadyExists: CONFLICT,
  isInvalid: BAD_REQUEST,
  notFound: NOT_FOUND,
  notPermitted: UNPROCESSABLE_ENTITY,
  unauthorized: UNAUTHORIZED,
};

const handleErrors = (err, _req, res, _next) => {
  if (err.code) {
    const status = statusByErrorCode[err.code];

    if (status) {
      return res.status(status).json({ message: err.message });
    }
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

module.exports = {
  handleErrors,
};

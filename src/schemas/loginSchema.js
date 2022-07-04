const Joi = require('joi');

// Ref: Course: https://app.betrybe.com/course/
// Ref: https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Invalid fields',
      'string.email': 'Invalid fields',
      'string.empty': 'Some required fields are missing',
      'string.required': 'Some required fields are missing',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.base': 'Invalid fields',
      'string.min': 'Invalid fields',
      'string.empty': 'Some required fields are missing',
      'string.required': 'Some required fields are missing',
    }),
});

module.exports = loginSchema;

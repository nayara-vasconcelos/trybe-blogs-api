const express = require('express');
const rescue = require('express-rescue');

const { validateLogin } = require('../../middlewares/loginMiddlewares');
const { signIn } = require('../../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, rescue(signIn));

module.exports = loginRouter;

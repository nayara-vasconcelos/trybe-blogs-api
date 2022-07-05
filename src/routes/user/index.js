const express = require('express');
const rescue = require('express-rescue');

const { validateUser } = require('../../middlewares/userMiddlewares');
const { create } = require('../../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', validateUser, rescue(create));

module.exports = userRouter;

const express = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../../middlewares/authMiddleware');
const { validateUser } = require('../../middlewares/userMiddlewares');
const { create, getAll } = require('../../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', validateToken, rescue(getAll));
userRouter.post('/', validateUser, rescue(create));

module.exports = userRouter;

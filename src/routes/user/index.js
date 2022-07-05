const express = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../../middlewares/authMiddleware');
const { validateUser } = require('../../middlewares/userMiddlewares');
const { create, getAll, getById } = require('../../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', validateToken, rescue(getAll));
userRouter.get('/:id', validateToken, rescue(getById));
userRouter.post('/', validateUser, rescue(create));

module.exports = userRouter;

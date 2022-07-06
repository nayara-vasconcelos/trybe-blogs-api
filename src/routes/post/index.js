const express = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../../middlewares/authMiddleware');
const { getAll, getById } = require('../../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', validateToken, rescue(getAll));
postRouter.get('/:id', validateToken, rescue(getById));

module.exports = postRouter;

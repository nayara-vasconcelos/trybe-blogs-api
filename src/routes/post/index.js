const express = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../../middlewares/authMiddleware');
const { getAll } = require('../../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', validateToken, rescue(getAll));

module.exports = postRouter;

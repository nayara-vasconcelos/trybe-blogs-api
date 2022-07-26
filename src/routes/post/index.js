const express = require('express');
const rescue = require('express-rescue');

const { validatePost } = require('../../middlewares/postMiddleware');
const { validateToken } = require('../../middlewares/authMiddleware');
const { getAll, getById, deleteById, create, update } = require('../../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', validateToken, rescue(getAll));
postRouter.get('/:id', validateToken, rescue(getById));
postRouter.delete('/:id', validateToken, rescue(deleteById));
postRouter.post('/', validateToken, validatePost, rescue(create));
postRouter.put('/:id', validateToken, validatePost, rescue(update));

module.exports = postRouter;

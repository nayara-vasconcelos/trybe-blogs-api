const express = require('express');
const rescue = require('express-rescue');

const { validateCategory } = require('../../middlewares/categoriesMiddleware');
const { validateToken } = require('../../middlewares/authMiddleware');
const { getAll, create } = require('../../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.get('/', validateToken, rescue(getAll));
categoriesRouter.post('/', validateToken, validateCategory, rescue(create));

module.exports = categoriesRouter;

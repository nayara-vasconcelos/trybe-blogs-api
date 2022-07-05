const express = require('express');
const rescue = require('express-rescue');

const { validateToken } = require('../../middlewares/authMiddleware');
const { getAll } = require('../../controllers/categoriesController');

const categoriesRouter = express.Router();

categoriesRouter.get('/', validateToken, rescue(getAll));

module.exports = categoriesRouter;

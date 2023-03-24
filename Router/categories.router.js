const express = require('express');

const categoryService = require("../service/category.service");
const validatorHandler = require('../middleware/validatorHandler');
const { updateCategorySchema, createCategorySchema, getCategorySchema } = require('../schemas/category.schema');

const categoryRouter = express.Router();
const service = new categoryService();

categoryRouter.use(express.json());


categoryRouter.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(id);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoryRouter;

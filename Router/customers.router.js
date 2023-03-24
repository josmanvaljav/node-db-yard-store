const express = require('express');

const customerService = require("../service/customer.service");
const validatorHandler = require('../middleware/validatorHandler');
const { updateCustomerSchema, createCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');

const customerRouter = express.Router();
const service = new customerService();

customerRouter.use(express.json());


customerRouter.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

customerRouter.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

customerRouter.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

customerRouter.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

customerRouter.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
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

module.exports = customerRouter;

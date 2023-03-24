const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);


const createOrderProductSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

const updateOrderProductSchema = Joi.object({
  orderId: orderId,
  productId: productId,
  amount: amount,
});

const getOrderProductSchema = Joi.object({
  id: id.required()
});

module.exports = { createOrderProductSchema, updateOrderProductSchema, getOrderProductSchema };

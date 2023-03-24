const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  // userId: userId.required(),
  user: Joi.object({                // Esta opción obliga a que cada vez que se cree un customer también se cree un usuario
    email: email.required(),
    password: password.required(),
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }

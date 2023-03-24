const express = require("express");
const orderService = require("../service/order.service");
const validatorHandler = require("../middleware/validatorHandler");
const { createOrderSchema, updateOrderSchema, getOrderSchema } = require("../schemas/order.schema");

const ordersRouter = express.Router();
const orderServ = new orderService;

ordersRouter.use(express.json());

ordersRouter.get("/", async (request, response) => {
  const orders = await orderServ.find();
  response.json(orders);
});

ordersRouter.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const orders = await orderServ.findOne(id);
      response.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.post(
  "/",
  validatorHandler(createOrderSchema, "body"),
  async (request, response) => {
    const body = request.body;
    const orders = await orderServ.create(body);
    response.status(201).json(orders);
  }
);

ordersRouter.patch(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  async (request, response) => { // similar tu PUT method
    try {
      const { id } = request.params;
      const body = request.body;

      const orders = await orderServ.update(id, body);
      response.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const message = await orderServ.delete(id);
  response.json({message});
});

module.exports = ordersRouter;

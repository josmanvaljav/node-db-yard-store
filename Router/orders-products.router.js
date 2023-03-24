const express = require("express");
const orderProductService = require("../service/order-product.service");
const validatorHandler = require("../middleware/validatorHandler");
const { createOrderProductSchema, updateOrderProductSchema, getOrderProductSchema } = require("../schemas/order-product.schema");

const ordersProductsRouter = express.Router();
const orderProductServ = new orderProductService;

ordersProductsRouter.use(express.json());

ordersProductsRouter.get("/", async (request, response) => {
  const ordersProducts = await orderProductServ.find();
  response.json(ordersProducts);
});

ordersProductsRouter.get(
  "/:id",
  validatorHandler(getOrderProductSchema, "params"),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const ordersProducts = await orderProductServ.findOne(id);
      response.json(ordersProducts);
    } catch (error) {
      next(error);
    }
  }
);

ordersProductsRouter.post(
  "/",
  validatorHandler(createOrderProductSchema, "body"),
  async (request, response) => {
    const body = request.body;
    const ordersProducts = await orderProductServ.create(body);
    response.status(201).json(ordersProducts);
  }
);

ordersProductsRouter.patch(
  "/:id",
  validatorHandler(getOrderProductSchema, "params"),
  validatorHandler(updateOrderProductSchema, "body"),
  async (request, response) => { // similar tu PUT method
    try {
      const { id } = request.params;
      const body = request.body;

      const ordersProducts = await orderProductServ.update(id, body);
      response.json(ordersProducts);
    } catch (error) {
      next(error);
    }
  }
);

ordersProductsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const message = await orderProductServ.delete(id);
  response.json({message});
});

module.exports = ordersProductsRouter;

const express = require("express");

const productsRouter = require("./products.router");
const usersRouter = require("./users.router");
const customersRouter = require("./customers.router");
const categoriesRouter = require("./categories.router");
const ordersRouter = require("./orders.router");
const ordersProductsRouter = require("./orders-products.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/customers", customersRouter);
  router.use("/categories", categoriesRouter);
  router.use("/orders", ordersRouter);
  router.use("/orders-products", ordersProductsRouter);

  const routerv2 = express.Router();
  app.use("/api/v2", routerv2);
  routerv2.use("/products", productsRouter);
  routerv2.use("/users", usersRouter);
}

module.exports = routerApi;

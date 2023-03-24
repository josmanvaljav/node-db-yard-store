const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class orderProductService {
  constructor() {}

  async find() {
    const response = await models.OrderProduct.findAll();
    return response;
  }

  async findOne(id) {
    const orderProduct = await models.OrderProduct.findByPk(id, {
      include: ["order", "product"]
    });

    if (!orderProduct) {
      throw boom.notFound("Order-Product not found");
    }
    return orderProduct;
  }

  async findOneOnly(id) {
    const orderProduct = await models.OrderProduct.findByPk(id);

    if (!orderProduct) {
      throw boom.notFound("Order-Product not found");
    }
    return orderProduct;
  }

  async create(data) {
    const newData = await models.OrderProduct.create(data);
    return newData;
  }

  async update(id, changes) {
    const orderProduct = await this.findOneOnly(id);
    const response = await orderProduct.update(changes);
    return response;
  }

  async delete(id) {
    const orderProduct = await this.findOneOnly(id);
    orderProduct.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = orderProductService;

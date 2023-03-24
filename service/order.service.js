const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class orderService {
  constructor() {}

  async find() {
    const response = await models.Order.findAll();
    return response;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        },
        "products"
      ]
    });

    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async findOneOnly(id) {
    const order = await models.Order.findByPk(id);

    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async create(data) {
    const newData = await models.Order.create(data);
    return newData;
  }

  async update(id, changes) {
    const order = await this.findOneOnly(id);
    const response = await order.update(changes);
    return response;
  }

  async delete(id) {
    const order = await this.findOneOnly(id);
    order.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = orderService;

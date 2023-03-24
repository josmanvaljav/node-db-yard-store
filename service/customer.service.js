const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class customerService {
  constructor() {}

  async find() {
    const response = await models.Customer.findAll({
      include: ["user"]
    });
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async create(data) {
    const newData = await models.Customer.create(data, {
      include: ["user"]
    });
    return newData;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = customerService;

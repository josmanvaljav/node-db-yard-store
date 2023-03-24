const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class productService {
  constructor() {}

  async find(query) {
    const options = {
      include: ["category"],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const response = await models.Product.findAll(options);
    return response;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async create(data) {
    const newData = await models.Product.create(data);
    return newData;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    product.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = productService;

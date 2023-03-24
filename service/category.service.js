const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class categoryService {
  constructor() {}

  async find() {
    const response = await models.Category.findAll();
    return response;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);

    if (!category) {
      throw boom.notFound("Category not found");
    }
    return category;
  }

  async create(data) {
    const newData = await models.Category.create(data);
    return newData;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findOne(id);
    category.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = categoryService;

const boom = require("@hapi/boom");
// const getConnection = require("../libs/postgres");
const { models } = require("../libs/sequelize"); // models was created when execute setupModels()

class userService {
  constructor() {}

  async find() {
    // const client = await getConnection();
    // const response = await client.query("SELECT * FROM tasks");
    // return response.rows;
    const response = await models.User.findAll({
      include: ["customer"]
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async create(data) {
    const newData = await models.User.create(data);
    return newData;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    user.destroy();
    return { message: "id eliminated: " + id };
  }
}

module.exports = userService;

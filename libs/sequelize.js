const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setupModels = require("../db/models");

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: "postgres",
  // dialect: "mysql",
  logging: config.isProd ? false : true,
};

let URI = "";
if (config.isProd) {
  URI = config.dbUrlProd;
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  URI = config.dbUrl;
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;

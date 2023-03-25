const { Pool } = require("pg");
const { config } = require("../config/config");

const options = {};
options.connectionString = config.dbUrl;

if (config.isProd) {
  // options.connectionString = config.dbUrlProd;
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
// else {
//   // const USER = encodeURIComponent(config.dbUser);
//   // const PASSWORD = encodeURIComponent(config.dbPassword);
//   // URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//   options.connectionString = config.dbUrl;
// }

const pool = new Pool(options);

module.exports = pool;

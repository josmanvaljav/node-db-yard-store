require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  dbUrl: process.env.DATABASE_URL,
  dbUrlProd: process.env.DATABASE_URL_PROD,


  appPort: process.env.PORT || 3500,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};

module.exports = { config };

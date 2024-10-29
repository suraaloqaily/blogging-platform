const postgresPool = require("pg").Pool;
require("dotenv").config();

const pool = new postgresPool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  max: 10,
});
module.exports = pool;

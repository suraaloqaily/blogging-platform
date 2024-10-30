// import pg from "pg";

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });
// module.exports = pool;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
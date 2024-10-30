require("dotenv").config();

const { Sequelize } = require("sequelize");

console.log(
  "Connecting to database with URL:",
  process.env.POSTGRES_PRISMA_URL
);

const sequelize = new Sequelize(process.env.POSTGRES_PRISMA_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;

const pool = require("../db");

const getUserByEmail = async (email) => {
  try {
    console.log("EMAIL");
    const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    return result;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
};
const createUser = async (name, email, hashedPassword) => {
  try {
    const result = await pool.query(
      'INSERT INTO "User"(name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    console.warn(result, "HERE");

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    const result = await pool.query('SELECT * FROM "User" WHERE id = $1', [
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};
module.exports = { getUserByEmail, createUser, getUserById };

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "30d" }
  );
};

module.exports = { generateToken };

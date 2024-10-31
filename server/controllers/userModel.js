const  prisma  = require("../prisma/prismaClient");

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error in getUser ByEmail:", error);
    throw error;
  }
};

const createUser  = async (name, email, hashedPassword) => {
  try {
    const newUser  = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
    return newUser ;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error in getUser ById:", error);
    throw error;
  }
};

module.exports = { getUserByEmail, createUser , getUserById };
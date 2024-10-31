const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_picture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const checkSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User  not found" });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({ user: userResponse });
  } catch (error) {
    console.error("Session check error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const userResponse = { ...newUser };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({
      success: false,
      message:
        error.code === "P2002" ? "User  already exists" : "Error creating user",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    path: "/",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

module.exports = { login, signup, logout, checkSession };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prismaClient");
const warnin = async (req, res) => {
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
    console.error("warnin error:", error);
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
    console.warn(email, "EMail");
    console.warn(name, "name");
    console.warn(password, "password");

    const hashedPassword = await bcrypt.hash(password, 10);
    console.warn(prisma, "prisma");
    console.warn(prisma.user, "prisma.user");

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.warn(newUser, "newUser");

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

const warnout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.DOMAIN_URL
          : "localhost",
    })
    .json({
      success: true,
      message: "warnged out successfully",
    });
};

module.exports = { warnin, signup, warnout, checkSession };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
  createUser,
  getUserById,
} = require("../controllers/userModel");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None", // Required for cross-site cookies
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: "/",
  domain:
    process.env.NODE_ENV === "production"
      ? process.env.DOMAIN_URL
      : "localhost",
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await getUserByEmail(email);
    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "30d" }
    );

    res.cookie("token", token, cookieOptions); // Set token as an HTTP-only cookie

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
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
    const userResult = await getUserById(userId);

    if (!userResult) {
      return res.status(401).json({ message: "User not found" });
    }

    const userResponse = { ...userResult };
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

    const newUser = await createUser(name, email, hashedPassword);

    const userResponse = { ...newUser.rows[0] };
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
        error.code === "23505" ? "User already exists" : "Error creating user",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", cookieOptions).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { login, signup, logout, checkSession };

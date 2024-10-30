const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");
const sequelize = require("./db");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
};

app.use(cookieParser(cookieOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  console.log("Origin:", req.headers.origin);
  res.send("Welcome");
});

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

module.exports = app;

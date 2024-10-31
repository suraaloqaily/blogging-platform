const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.toke;
    console.log("FROM AUTH");

    const bearerToken = req.headers.authorization?.split(" ")[1];
    console.log("FROM AUTH bearerToken", bearerToken);

    const finalToken = token || bearerToken;
    console.log("FROM AUTH finalToken", finalToken);

    if (!finalToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      finalToken,
      process.env.JWT_SECRET || "secretkey"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

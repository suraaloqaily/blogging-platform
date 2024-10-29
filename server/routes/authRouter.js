const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  logout,
  checkSession,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.get("/session", authMiddleware, checkSession);
router.get("/test-cookie", (req, res) => {
  const token = req.cookies.token;
  res.json({
    cookiesPresent: !!token,
    allCookies: req.cookies,
  });
});
module.exports = router;

const express = require("express");
const { updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.put("/update", authMiddleware, updateProfile);

module.exports = router;

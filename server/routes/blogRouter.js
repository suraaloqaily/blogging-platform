const express = require("express");
const {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getBlogsByUserId,
  likeBlog,
  getBlogById,
  checkLike,
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/auth");
const {
  createComment,
  getBlogComments,
} = require("../controllers/commentController");
const router = express.Router();

router.get("/", authMiddleware, getBlogs);
router.post("/:id/like", authMiddleware, likeBlog);
router.post("/:blogId/comments", authMiddleware, createComment);
router.get("/:blogId/comments", authMiddleware, getBlogComments);
router.get("/:id/check-like", authMiddleware, checkLike);
router.get("/:id", authMiddleware, getBlogsByUserId);
router.get("/blogId/:id", authMiddleware, getBlogById);
router.put("/:id", authMiddleware, updateBlog);
router.post("/", authMiddleware, createBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;

const pool = require("../db");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const userQuery = await pool.query(
      'SELECT name, profilePicture FROM "User" WHERE id = $1',
      [userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "User  not found" });
    }

    const userName = userQuery.rows[0].name;
    const userProfilePicture = userQuery.rows[0].profilePicture;

    const newBlog = await pool.query(
      'INSERT INTO "Blog"(userId, title, content, authorName, authorImage, createdAt) VALUES($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [userId, title, content, userName, userProfilePicture]
    );

    res.json(newBlog.rows[0]);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await pool.query(`
      SELECT b.*, u.name as authorName,
      (SELECT COUNT(*) FROM "Like" WHERE blogId = b.id) as like_count
      FROM "Blog" b 
      JOIN "User" u ON b.userId = u.id
    `);
    res.json(blogs.rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

const getBlogsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await pool.query(
      'SELECT b.*, u.name as authorName FROM "Blog" b JOIN "User" u ON b.userId = u.id WHERE b.userId = $1',
      [id]
    );
    res.json(blogs.rows);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Server error while fetching user blogs" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blogCheck = await pool.query(
      'SELECT userId FROM "Blog" WHERE id = $1',
      [id]
    );

    if (blogCheck.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blogCheck.rows[0].userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await pool.query('DELETE FROM "Blog" WHERE id = $1', [id]);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT b.*, u.name as authorName 
      FROM "Blog" b 
      JOIN "User" u ON b.userId = u.id 
      WHERE b.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const blogCheck = await pool.query(
      'SELECT userId FROM "Blog" WHERE id = $1',
      [id]
    );

    if (blogCheck.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blogCheck.rows[0].userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this blog" });
    }

    const userQuery = await pool.query(
      'SELECT name FROM "User" WHERE id = $1',
      [userId]
    );
    const userName = userQuery.rows[0].name;

    const updatedBlog = await pool.query(
      'UPDATE "Blog" SET title = $1, content = $2, authorName = $3, updatedAt = NOW() WHERE id = $4 RETURNING *',
      [title, content, userName, id]
    );

    res.json(updatedBlog.rows[0]);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error while updating blog" });
  }
};
const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const existingLike = await pool.query(
      'SELECT * FROM "Like" WHERE blogId = $1 AND userId = $2',
      [id, userId]
    );

    if (existingLike.rows.length > 0) {
      await pool.query('DELETE FROM "Like" WHERE blogId = $1 AND userId = $2', [
        id,
        userId,
      ]);

      const likeCount = await pool.query(
        'SELECT COUNT(*) FROM "Like" WHERE blogId = $1',
        [id]
      );

      return res.json({
        liked: false,
        likeCount: parseInt(likeCount.rows[0].count),
      });
    }

    await pool.query(
      'INSERT INTO "Like"(blogId, userId,createdAt) VALUES($1, $2, NOW())',
      [id, userId]
    );

    const likeCount = await pool.query(
      'SELECT COUNT(*) FROM "Like" WHERE blogId = $1',
      [id]
    );

    res.json({
      liked: true,
      likeCount: parseInt(likeCount.rows[0].count),
    });
  } catch (error) {
    console.error("Error handling blog like:", error);
    res.status(500).json({ message: "Server error while handling like" });
  }
};
const checkLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingLike = await pool.query(
      'SELECT * FROM "Like" WHERE blogId = $1 AND userId = $2',
      [id, userId]
    );
    const likesCount = await pool.query(
      'SELECT * FROM "Like" WHERE blogId = $1',
      [id]
    );
    res.json({
      liked: existingLike.rows.length > 0,
      like_count: likesCount.rowCount,
    });
  } catch (error) {
    console.error("Error checking like status:", error);
    res
      .status(500)
      .json({ message: "Server error while checking like status" });
  }
};
module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  getBlogsByUserId,
  updateBlog,
  likeBlog,
  checkLike,
  getBlogById,
};

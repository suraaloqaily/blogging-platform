const pool = require("../db");

const createComment = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    if (!blog_id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const query = `
      INSERT INTO "Comment" (blog_id, user_id, content, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const values = [blog_id, user_id, content];

    const result = await pool.query(query, values);
    const newComment = result.rows[0];

    const commentWithAuthor = await pool.query(
      `
      SELECT c.*, u.name as author_name
      FROM "Comment" c
      JOIN "User" u ON c.user_id = u.id
      WHERE c.id = $1
    `,
      [newComment.id]
    );

    return res.status(201).json(commentWithAuthor.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      error: "Failed to create comment",
      details: error.message,
    });
  }
};
const getBlogComments = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const query = `
      SELECT 
        c.*,
        u.name as author_name,
        u.email as author_email
      FROM "Comment" c
      JOIN "User" u ON c.user_id = u.id
      WHERE c.blog_id = $1
      ORDER BY c.created_at DESC
    `;

    const result = await pool.query(query, [blog_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
module.exports = {
  createComment,
  getBlogComments,
};

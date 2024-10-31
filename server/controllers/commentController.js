const pool = require("../db");

const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const query = `
      INSERT INTO "Comment" ("blogId", "userId", content, "createdAt")
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const values = [blogId, userId, content];

    const result = await pool.query(query, values);
    const newComment = result.rows[0];

    const commentWithAuthor = await pool.query(
      `
      SELECT c.*, u.name as "authorName"
      FROM "Comment" c
      JOIN "User" u ON c."userId" = u.id
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
    const { blogId } = req.params;

    const query = `
      SELECT 
        c.*,
        u.name as authorName,
        u.email as author_email
      FROM "Comment" c
      JOIN "User" u ON c.userId = u.id
      WHERE c.blogId = $1
      ORDER BY c."createdAt" DESC
    `;

    const result = await pool.query(query, [blogId]);
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

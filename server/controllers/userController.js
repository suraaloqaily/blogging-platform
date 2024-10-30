const pool = require("../db");
const { generateToken } = require("../utils/auth");

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, profileImage } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const emailCheck = await pool.query(
      'SELECT * FROM "User" WHERE email = $1 AND id != $2',
      [email, userId]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already in use by another account",
      });
    }

    const updateQuery = profileImage
      ? 'UPDATE "User" SET name = $1, email = $2, profile_picture = $3, updated_at = NOW() WHERE id = $4 RETURNING *'
      : 'UPDATE "User" SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *';

    const updateValues = profileImage
      ? [name, email, profileImage, userId]
      : [name, email, userId];

    const update = await pool.query(updateQuery, updateValues);

    if (update.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    const updatedUser = update.rows[0];

    const updateBlogsQuery = `
      UPDATE "Blog"
      SET author_image = $1, author_name = $2
      WHERE user_id = $3
    `;

    await pool.query(updateBlogsQuery, [
      updatedUser.profile_picture,
      updatedUser.name,
      userId,
    ]);

    const token = generateToken(updatedUser);

    res.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profile_picture: updatedUser.profile_picture,
      },
      token,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

module.exports = {
  updateProfile,
};

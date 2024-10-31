const { generateToken } = require("../utils/auth");
const prisma  = require("../prisma/prismaClient");

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

    const emailCheck = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (emailCheck && emailCheck.id !== userId) {
      return res.status(400).json({
        success: false,
        message: "Email already in use by another account",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        profilePicture: profileImage || undefined,
        updatedAt: new Date(),
      },
    });

    await prisma.blog.updateMany({
      where: { userId: userId },
      data: {
        authorName: updatedUser.name,
        authorImage: updatedUser.profilePicture,
      },
    });

    const token = generateToken(updatedUser);

    res.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profile_picture: updatedUser.profilePicture,
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
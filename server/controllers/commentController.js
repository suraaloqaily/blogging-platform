const prisma = require("../prisma/prismaClient");

const createComment = async (req, res) => {
  try {
    console.log("Request parameters createComment:", req.params);
    console.log("Request body createComment:", req.body);

    const { blogId } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    console.log("User  ID:", user_id);
    console.log("Blog ID:", blogId);
    console.log("Comment Content:", content);

    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    const newComment = await prisma.comment.create({
      data: {
        blogId: parseInt(blogId),
        userId: user_id,
        content: content,
      },
    });

    console.log("New Comment Created:", newComment);

    const commentWithAuthor = await prisma.comment.findUnique({
      where: { id: newComment.id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      ...commentWithAuthor,
      author_name: commentWithAuthor.user.name,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      error: "Failed to create comment",
      details: error.message,
    });
  }
};
const getBlogComments = async (req, res) => {
  console.log("Request parameters getBlogComments:", req.params);
  try {
    const blog_id = req.params.blogId;

    const comments = await prisma.comment.findMany({
      where: { blogId: parseInt(blog_id) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const commentsWithAuthors = comments.map((comment) => ({
      ...comment,
      author_name: comment.user.name,
      author_email: comment.user.email,
    }));

    res.json(commentsWithAuthors);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

module.exports = {
  createComment,
  getBlogComments,
};

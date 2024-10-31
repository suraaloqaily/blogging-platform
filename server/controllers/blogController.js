const prisma = require("../prisma/prismaClient");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, profilePicture: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    const newBlog = await prisma.blog.create({
      data: {
        userId,
        title,
        content,
        authorName: user.name,
        authorImage: user.profilePicture,
        createdAt: new Date(),
      },
    });

    res.json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: {
          select: { name: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    res.json(
      blogs.map((blog) => ({
        ...blog,
        like_count: blog._count.likes,
      }))
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

const getBlogsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const blogs = await prisma.blog.findMany({
      where: { userId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Server error while fetching user blogs" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { userId: true },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await prisma.blog.delete({ where: { id: blogId } });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        user: {
          select: { name: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({
      ...blog,
      like_count: blog._count.likes,
    });
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
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { userId: true },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this blog" });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error while updating blog" });
  }
};

const likeBlog = async (req, res) => {
  console.log("Request parameters Like Blog:", req.params);
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return res.status(400).json({ error: "Invalid blog ID." });
    }

    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        blogId: blogId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return res.json({ liked: false, message: "Like removed." });
    } else {
      await prisma.like.create({ data: { userId, blogId } });
      return res.json({ liked: true, message: "Blog liked." });
    }
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Server error while liking blog." });
  }
};

const checkLike = async (req, res) => {
  console.log("Request parameters check blog:", req.params);
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blogId = parseInt(id, 10);

    if (isNaN(blogId)) {
      return res.status(400).json({ error: "Invalid blog ID." });
    }

    const existingLike = await prisma.like.findFirst({
      where: { userId, blogId },
    });

    res.json({ liked: !!existingLike });
  } catch (error) {
    console.error("Error checking like:", error);
    res.status(500).json({ message: "Server error while checking like." });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogsByUserId,
  deleteBlog,
  getBlogById,
  updateBlog,
  likeBlog,
  checkLike,
};

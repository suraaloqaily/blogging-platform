const { prisma } = require("../prisma/prismaClient");

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
    const blogs = await prisma.blog.findMany({
      where: { userId: id },
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

    const blog = await prisma.blog.findUnique({
      where: { id },
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

    await prisma.blog.delete({ where: { id } });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
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

    const blog = await prisma.blog.findUnique({
      where: { id },
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
      where: { id },
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
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId: id,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_blogId: {
            userId,
            blogId: id,
          },
        },
      });
      return res.json({ message: "Like removed" });
    } else {
      await prisma.like.create({
        data: {
          userId,
          blogId: id,
        },
      });
      return res.json({ message: "Blog liked" });
    }
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ message: "Server error while liking blog" });
  }
};

const checkLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId,
          blogId: id,
        },
      },
    });

    res.json({ liked: !!existingLike });
  } catch (error) {
    console.error("Error checking like:", error);
    res.status(500).json({ message: "Server error while checking like" });
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

class ApiService {
  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    this.baseUrl = `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs`;
    ApiService.instance = this;
  }

  async fetchComments(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}/comments`, {
        credentials: "true",
      });
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    } catch (error) {
      return {
        success: false,
        message: "Unable to load comments. Please try again later.",
      };
    }
  }

  async checkIfLiked(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}/check-like`, {
        credentials: "true",
      });
      if (!response.ok) throw new Error("Failed to check like status");
      return response.json();
    } catch (error) {
      return {
        success: false,
        message: "Unable to check like status. Please try again later.",
      };
    }
  }

  async likeBlog(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}/like`, {
        method: "POST",
        credentials: "true",
      });
      if (!response.ok) throw new Error("Failed to like blog");
      return response.json();
    } catch (error) {
      return {
        success: false,
        message: "Unable to like the blog. Please try again later.",
      };
    }
  }

  async deleteBlog(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}`, {
        method: "DELETE",
        credentials: "true",
      });
      if (!response.ok) throw new Error("Failed to delete blog");
      return response.json();
    } catch (error) {
      return {
        success: false,
        message: "Unable to delete the blog. Please try again later.",
      };
    }
  }

  async addComment(blogId, commentText) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "true",
        body: JSON.stringify({ content: commentText }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      return response.json();
    } catch (error) {
      return {
        success: false,
        message: "Unable to add comment. Please try again later.",
      };
    }
  }

  async fetchBlogDetails(blogId) {
    try {
      const blogRes = await fetch(`${this.baseUrl}/blogId/${blogId}`, {
        credentials: "true",
      });

      if (!blogRes.ok) {
        if (blogRes.status === 404) {
          return { success: false, message: "Blog not found" };
        }
        throw new Error("Failed to fetch blog");
      }

      const blogData = await blogRes.json();

      const [commentsData, likeData] = await Promise.all([
        this.fetchComments(blogId),
        this.checkIfLiked(blogId),
      ]);

      return {
        success: true,
        blog: blogData,
        comments: commentsData,
        liked: likeData.liked,
        likeCount: likeData.like_count,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to load blog details. Please try again later.",
      };
    }
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;

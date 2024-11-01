import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";
const BlogsContext = createContext();
import { parseCookies } from "nookies";

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const fetchBlogs = async () => {
    try {
      const cookies = parseCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
    }
  };
  useEffect(() => {
    const isAuthPage =
      router.pathname.includes("/login") ||
      router.pathname.includes("/register");
    if (!isAuthPage && user) {
      fetchBlogs();
    }
  }, [user, router.pathname]);

  const createBlog = async (blogData) => {
    try {
      const cookies = parseCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
          body: JSON.stringify(blogData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
        return { success: true };
      } else {
        console.error("Create blog error:", response.statusText);
        return { success: false };
      }
    } catch (error) {
      console.error("Create blog error:", error);
      return { success: false };
    }
  };

  const updateBlogLikes = (id, likeCount, isLiked) => {
    setBlogs((prevBlogs) => {
      if (!Array.isArray(prevBlogs)) {
        console.error("prevBlogs is not an array:", prevBlogs);
        return [];
      }
      return prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, likeCount, isLiked } : blog
      );
    });
  };
  const updateBlog = async (id, blogData) => {
    try {
      const cookies = parseCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
        return { success: true };
      }
    } catch (error) {
      console.error("Update blog error:", error);
      return { success: false };
    }
  };

  const deleteBlog = async (id) => {
    const cookies = parseCookies();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        return { success: true };
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      return { success: false };
    }
  };
  const updateBlogComments = (id, comments) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, comments } : blog
      );
    });
  };

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        createBlog,
        updateBlog,
        deleteBlog,
        updateBlogLikes,
        updateBlogComments,
      }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogsContext);

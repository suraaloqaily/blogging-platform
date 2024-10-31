import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";
const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
 
  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs`,
        {
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
  }, [ user, router.pathname ] );
  
 const createBlog = async (blogData) => {
   try {
     const response = await axios.post(
       `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs`,
       blogData,
       {
         withCredentials: true,
       }
     );

     if (response.status === 201) {
       const newBlog = response.data;
       setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
       return { success: true };
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}blogs/${id}`,
        {
          method: "DELETE",
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

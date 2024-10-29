import React from "react";
import Blog from "./Blog";
import { useBlogs } from "@/app/context/BlogsContext";
import { useAuth } from "@/app/context/AuthContext";
import styles from "@/styles/Blogs.module.css";
import Link from "next/link";

const Blogs = () => {
  const { blogs } = useBlogs();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={styles.unauthorizedMessage}>
        Please <Link href="/blogging-platform/login">login</Link> or{" "}
        <Link href="/blogging-platform/register">signup</Link> to view blogs
      </div>
    );
  }

  return (
    <div className={styles.blogsContainer}>
      {user && (
        <div className={styles.createBlogSection}>
          <h2>Create New Blog</h2>
          <form className={styles.createBlogForm}>
            <input
              type="text"
              placeholder="Blog title..."
              className={styles.titleInput}
            />
            <textarea
              placeholder=" 💭 what is in your mind"
              className={styles.contentInput}
            />
            <button
              type="submit"
              className={styles.submitButton}>
              Publish Blog
            </button>
          </form>
        </div>
      )}

      <div className={styles.blogsGrid}>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            data={blog}
            isAuthor={blog.user_id === user?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;

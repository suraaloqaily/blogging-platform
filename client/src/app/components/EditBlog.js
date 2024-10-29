import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useBlogs } from "@/app/context/BlogsContext";
import { useAuth } from "@/app/context/AuthContext";
import styles from "@/styles/EditBlog.module.css";

const EditBlog = ({ blog }) => {
  const router = useRouter();
  const { id } = router.query;
  const { updateBlog } = useBlogs();
  const { user } = useAuth();

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  useEffect(() => {
    if (blog && user && blog.user_id !== user.id) {
      router.push("/homepage");
    }
  }, [blog, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = { title, content };
      await updateBlog(id, updatedBlog);
      router.push("/homepage");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
          className={styles.input}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog content"
          className={styles.textarea}
          rows="10"
        />
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.submitButton}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/homepage")}
            className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;

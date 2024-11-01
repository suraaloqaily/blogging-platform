import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import styles from "@/styles/CreateBlog.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { useBlogs } from "@/app/context/BlogsContext"; 
import Loading from "@/app/components/Loading";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();
  const containerRef = useRef(null);
  const { user } = useAuth();
  const { createBlog } = useBlogs();  

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        router.push("/homepage");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [router]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!user) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!title.trim()) {
      setMessage({ text: "Title cannot be empty ", type: "error" });
      return;
    }
    if (!content.trim()) {
      setMessage({ text: "Content cannot be empty", type: "error" });
      return;
    }

    try {
      const result = await createBlog({ title, content }); 
      if (result.success) {
        router.push("/homepage");
      } else {
        setMessage({
          text: "An error occurred while creating the blog.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setMessage({
        text: "An error occurred while creating the blog.",
        type: "error",
      });
    }
  };

  return (
    <div
      className={styles.createBlogContainer}
      ref={containerRef}>
      <button
        onClick={() => router.push("/homepage")}
        className={styles.backButton}>
        <FaArrowLeft />
      </button>
      <div className={styles.header}>
        <h2>Create a New Blog</h2>
      </div>
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}{" "}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setMessage({ text: "", type: "" });
          }}
          placeholder="Blog Title"
          className={styles.inputField}
        />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setMessage({ text: "", type: "" });
          }}
          placeholder=" 💭 what is in your mind"
          className={styles.textArea}
        />
        <div className={styles.buttonGroup}>
          {" "}
          <button
            type="submit"
            className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

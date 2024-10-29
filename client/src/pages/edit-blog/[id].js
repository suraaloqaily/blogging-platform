import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EditBlog from "@/app/components/EditBlog";
import Loading from "@/app/components/Loading";
import styles from "@/styles/BlogDetails.module.css";
import apiService from "@/services/BlogsApiServices";

const BlogPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const blogDetails = await apiService.fetchBlogDetails(id);
        setBlog(blogDetails.blog);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError("Failed to load blog details. Redirecting to homepage...");
        setTimeout(() => {
          router.push("/homepage");
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  const handleClose = () => {
    router.push("/homepage");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        Blog not found
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <div className={styles.blogHeader}>
            <h1 className={styles.title}>{blog.title}</h1>{" "}
          </div>
          <button
            className={styles.closeButton}
            onClick={handleClose}>
            ×
          </button>
        </div>
        <EditBlog blog={blog} />
      </div>
    </div>
  );
};

export default BlogPage;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BlogDetail from "@/app/components/BlogDetail";
import Loading from "@/app/components/Loading";
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
        }, 500);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

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

  return <BlogDetail blogId={id} />;
};

export default BlogPage;

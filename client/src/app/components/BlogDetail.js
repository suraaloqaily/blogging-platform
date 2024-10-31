import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import formatDateHelper from "@/app/helpers/date-helper";
import { useRouter } from "next/router";
import Loading from "./Loading";
import styles from "@/styles/BlogDetails.module.css";
import apiService from "@/services/BlogsApiServices";

const BlogDetail = ({ blogId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { blog, comments, liked, likeCount } =
          await apiService.fetchBlogDetails(blogId);
        setBlog(blog);
        setComments(comments);
        setIsLiked(liked);
        setLikeCount(likeCount);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchData();
    }
  }, [blogId, router]);

  const handleClose = () => {
    router.push("/homepage");
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const newComment = await apiService.addComment(blogId, commentText);
      console.log("New comment Added", newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      const data = await apiService.likeBlog(blogId);
      console.log(data, "Dta insdie handle like comming from server");
      setIsLiked( data.liked );
      setLikeCount(data.likeCount)
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  if (isLoading || !blog) {
    return (
      <div
        className={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Loading />
      </div>
    );
  }
  console.warn(blog, "BLOG");

  return (
    <div className="blog-detail-page">
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={handleClose}>
          ×
        </button>

        <div className={styles.blogContent}>
          <div className={styles.blogHeader}>
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.metadata}>
              <span>By {blog.authorName}</span>
              <span>{formatDateHelper(blog.createdAt)}</span>
            </div>
          </div>

          <div className={styles.content}>{blog.content}</div>

          <div className={styles.interactions}>
            <button
              className={styles.likeButton}
              onClick={handleLike}>
              {isLiked ? "❤️" : "🤍"} {likeCount}
            </button>
            <span>💭 {comments.length}</span>
          </div>
        </div>

        <div className={styles.commentsSection}>
          <h3>Comments</h3>

          {user && (
            <form
              className={styles.commentForm}
              onSubmit={handleComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className={styles.commentInput}
                rows="3"
              />
              <button
                type="submit"
                className={styles.submit}>
                Post
              </button>
            </form>
          )}

          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>
                      {comment.authorName}
                    </span>
                    <span className={styles.commentDate}>
                      {comment?.createdAt
                        ? formatDateHelper(comment.createdAt)
                        : "00:00"}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

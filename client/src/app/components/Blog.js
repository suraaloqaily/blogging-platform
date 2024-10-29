import React, { useEffect, useState } from "react";
import { useBlogs } from "@/app/context/BlogsContext";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import styles from "../styles/Blog.module.css";
import avatar_icon from "@/pages/Assets/profile-avatar.png";
import apiService from "@/services/BlogsApiServices";
import Image from "next/image";

const Blog = ({ data, isAuthor }) => {
  const { user } = useAuth();
  const { deleteBlog } = useBlogs();
  const router = useRouter();

  const [likeCount, setLikeCount] = useState(data.like_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const commentsData = await apiService.fetchComments(data.id);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInitialData();
  }, [data.id]);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        try {
          const likeData = await apiService.checkIfLiked(data.id);
          setIsLiked(likeData.liked);
          setLikeCount(likeData.like_count);
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkIfLiked();
  }, [data.id, user]);

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push({
      pathname: "/edit-blog/[id]",
      query: { id: data.id },
    });
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const likeData = await apiService.likeBlog(data.id);
      setLikeCount(likeData.likeCount);
      setIsLiked(likeData.liked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleModalConfirm = async (e) => {
    e.stopPropagation();
    await deleteBlog(data.id);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleOpenDetail = (e) => {
    e.stopPropagation();
    router.push(`/blog/${data.id}`);
  };

  const truncateText = (text, length) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  return (
    <div
      className={styles.blogCard}
      onClick={handleOpenDetail}>
      <div className={styles.blogHeader}>
        <div className={styles.titleSection}>
          <div className={styles.title}>
            <h2>{truncateText(data.title, 25)}</h2>
          </div>
          <span className={styles.author}>
            <Image
              src={data?.author_image || avatar_icon.src}
              alt={data.author_name}
              className={styles.authorImage}
              width={50}
              height={50}
            />
            By: {data.author_name}
          </span>
        </div>

        {isAuthor && (
          <div className={styles.adminButtons}>
            <div onClick={(e) => e.stopPropagation()}></div>
          </div>
        )}
      </div>

      <p className={styles.content}>{truncateText(data.content, 50)}</p>

      <div className={styles.actions}>
        <div className={styles.interactionGroup}>
          <div className={styles.leftActions}>
            <button
              onClick={handleLike}
              className={styles.likeButton}>
              {isLiked ? "❤️" : "🤍"} {likeCount}
            </button>
            <span onClick={(e) => e.stopPropagation()}>
              💭 {comments.length}
            </span>{" "}
          </div>

          {isAuthor && (
            <div className={styles.adminInteraction}>
              <button
                onClick={handleEdit}
                className={styles.adminButton}
                title="Edit post">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M11 4H4a2  2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className={styles.adminButton}
                title="Delete post">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this blog?</p>
            <button
              className={styles.confirmButton}
              onClick={handleModalConfirm}>
              Confirm
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleModalCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;

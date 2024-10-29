import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import styles from "@/styles/Profile.module.css";
import { FaCamera, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import avatar_icon from "@/pages/Assets/profile-avatar.png";
import Loading from "@/app/components/Loading";
import Image from "next/image";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const containerRef = useRef(null);
  const router = useRouter();

  // State hooks
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profileImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState(
    user?.profile_picture || avatar_icon.src
  );
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          text: "Image size should be less than 5MB",
          type: "error",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prev) => ({
          ...prev,
          profileImage: base64String,
        }));
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    try {
      const result = await updateUser({
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage,
      });

      if (result.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setIsEditing(false);
      } else {
        setMessage({ text: result.message || "Update failed", type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred while updating profile",
        type: "error",
      });
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      router.push("/blogging-platform/homepage");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className={styles.profileContainer}>
      <div
        className={styles.profileCard}
        ref={containerRef}>
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.header}>
          <h2>Profile Settings</h2>

          <div className={styles.buttonContainer}>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Edit profile">
              {isEditing ? <FaTimes /> : <FaEdit />}
            </button>
            {isEditing ? null : (
              <button
                onClick={() => router.push("/blogging-platform/homepage")}
                className={styles.closeButton}
                aria-label="Close profile settings">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <Image
                src={previewUrl}
                alt=""
                className={styles.avatar}
                width={50}
                height={50}
              />
              {isEditing && (
                <>
                  <div
                    className={styles.avatarOverlay}
                    onClick={handleImageClick}>
                    <FaCamera className={styles.cameraIcon} />
                    <span>Change Photo</span>
                  </div>
                  <button
                    className={styles.updateImageButton}
                    onClick={handleImageClick}
                    type="button">
                    <FaCamera />
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              disabled={!isEditing}
              className={!isEditing ? styles.disabled : ""}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              disabled={!isEditing}
              className={!isEditing ? styles.disabled : ""}
            />
          </div>

          {isEditing && (
            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={styles.submitButton}>
                <FaCheck /> Save Changes
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    profileImage: null,
                  });
                  setPreviewUrl(user?.profile_picture || avatar_icon.src);
                }}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;

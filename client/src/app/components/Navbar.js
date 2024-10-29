import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import avatar_icon from "../../pages/Assets/profile-avatar.png";

import TypingText from "./TypingText";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <TypingText
        text={
          "Hey there, Blogger!! Dive into a world of words. Share your passion, tell your story, and let your creativity flow! "
        }
        name={user ? user.name : "Guest"}
      />
      <div className={styles.navLinks}>
        <button
          onClick={() => router.push("/create-blog")}
          className={styles.createBlogButton}>
          Create New Blog
        </button>

        {!user ? (
          <>
            <Link
              href="/login"
              className={styles.navLink}>
              Login
            </Link>
            <Link
              href="/register"
              className={styles.navLink}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <div className={styles.profileContainer}>
              <button
                name="profile"
                onClick={toggleDropdown}
                className={styles.profileButton}>
                <Image
                  src={user.profile_picture || avatar_icon.src || "/avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className={styles.profilePic}
                />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    href="/profile"
                    className={styles.dropdownItem}>
                    Your Profile
                  </Link>
                  <Link
                    href="/your-blogs"
                    className={styles.dropdownItem}>
                    Your Blogs
                  </Link>
                  <div
                    onClick={handleLogout}
                    className={styles.dropdownItem}>
                    logout <FaSignOutAlt />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

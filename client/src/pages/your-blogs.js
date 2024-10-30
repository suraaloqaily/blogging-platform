import React, { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import Loading from "@/app/components/Loading";
import Blog from "@/app/components/Blog";
import Navbar from "@/app/components/Navbar";
import { useBlogs } from "@/app/context/BlogsContext";
const YourBlogs = () => {
  const { blogs } = useBlogs();
  const { user, logout } = useAuth();

  const router = useRouter();
  const userBlogs = blogs.filter((blog) => blog.userId === user?.id);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return <Loading />;
  }
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="homepage">
      <Navbar onLogout={handleLogout} />
      <div className="content-container">
        <div className="blogs-section">
          <div className="blogs-grid">
            {userBlogs.map((blog) => (
              <Blog
                key={blog.id}
                data={blog}
                isAuthor={blog.userId === user.id}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background: #f5f5f5;
        }
        .content-container {
          display: flex;
          padding: 20px;
          gap: 20px;
        }
        .sidebar {
          width: 250px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        .blogs-section {
          flex: 1;
        }
        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .create-blog-button {
          width: 100%;
          padding: 10px;
          background: #c4b1d1;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
        .user-info {
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .content-container {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default YourBlogs;

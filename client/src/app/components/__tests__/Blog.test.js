import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import { useBlogs } from "../../context/BlogsContext";
import Blog from "../Blog";
import apiService from "../../../services/BlogsApiServices";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../context/BlogsContext", () => ({
  useBlogs: jest.fn(),
}));

jest.mock("../../../services/BlogsApiServices", () => ({
  likeBlog: jest.fn(),
  fetchComments: jest.fn(),
  checkIfLiked: jest.fn(),
}));

describe("Blog Component", () => {
  const mockDeleteBlog = jest.fn();
  const mockRouterPush = jest.fn();
  const mockFetchComments = jest.fn();
  const mockCheckIfLiked = jest.fn();
  const mockLikeBlog = jest.fn();

  const mockData = {
    id: "1",
    title: "Test Blog",
    content: "This is a test blog content.",
    author_name: "John Doe",
    author_image: "",
    like_count: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ user: { name: "John Doe" } });
    useBlogs.mockReturnValue({ deleteBlog: mockDeleteBlog });
    apiService.fetchComments.mockImplementation(() => Promise.resolve([]));
    apiService.checkIfLiked.mockImplementation(() =>
      Promise.resolve({ liked: false, like_count: 0 })
    );
    apiService.likeBlog.mockImplementation(() =>
      Promise.resolve({ liked: true, likeCount: 1 })
    );
    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      push: mockRouterPush,
    }));
  });

  test("likes a blog post", async () => {
    const mockData = {
      id: "1",
      title: "Test Blog",
      content: "This is a test blog content.",
      like_count: 0,
    };

    apiService.checkIfLiked.mockResolvedValueOnce({
      liked: false,
      like_count: 1,
    });
    apiService.likeBlog.mockResolvedValueOnce({ success: true });

    await act(async () => {
      render(<Blog data={mockData} />);
    });

    const likeButton = screen.getByRole("button", { name: /🤍/i });
    await act(async () => {
      fireEvent.click(likeButton);
    });

    expect(apiService.likeBlog).toHaveBeenCalledWith(mockData.id);
    expect(
      await screen.findByRole("button", { name: /🤍/i })
    ).toBeInTheDocument();
  });
  test("edits a blog post", () => {
    render(
      <Blog
        data={mockData}
        isAuthor={true}
      />
    );

    const editButton = screen.getByTitle("Edit post");
    fireEvent.click(editButton);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/edit-blog/[id]",
      query: { id: mockData.id },
    });
  });

  test("deletes a blog post", async () => {
    render(
      <Blog
        data={mockData}
        isAuthor={true}
      />
    );

    const deleteButton = screen.getByTitle("Delete post");
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByRole("button", {
      name: /confirm/i,
    });
    fireEvent.click(confirmButton);

    expect(mockDeleteBlog).toHaveBeenCalledWith(mockData.id);
    expect(mockDeleteBlog).toHaveBeenCalledTimes(1);
  });

  test("cancels deletion of a blog post", async () => {
    render(
      <Blog
        data={mockData}
        isAuthor={true}
      />
    );

    const deleteButton = screen.getByTitle("Delete post");
    fireEvent.click(deleteButton);

    const cancelButton = await screen.findByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockDeleteBlog).not.toHaveBeenCalled();
  });
});

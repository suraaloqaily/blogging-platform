import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Navbar from "../Navbar";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockLogout = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test("renders login and signup links when user is not logged in", () => {
    useAuth.mockReturnValue({ user: null });

    render(<Navbar />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
    expect(screen.queryByText(/your profile/i)).not.toBeInTheDocument();
  });

  test("navigates to create blog page on button click", () => {
    useAuth.mockReturnValue({
      user: { name: "John Doe", profilePicture: "" },
    });

    render(<Navbar />);

    fireEvent.click(screen.getByRole("button", { name: /Create New Blog/i }));

    expect(mockPush).toHaveBeenCalledWith("/create-blog");
  });
});

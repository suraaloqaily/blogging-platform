class AuthService {
  static instance;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  async register(userData) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Registration failed" };
    }
  }
}

const authService = new AuthService();
export default authService;

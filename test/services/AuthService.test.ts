import { AuthService } from "../../src/services/AuthService";

describe("AuthService", () => {
  const authService = new AuthService();

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "Maires Souza",
        email: "maires@gmail.com",
        password: "123456",
      };

      const response = await authService.register(userData);

      expect(response.data).toHaveProperty("_id");
      if (response.status === "CREATED") {
        expect(response.data.name).toBe("Maires Souza");
        expect(response.data.email).toBe("maires@gmail.com");
        expect(response.data).not.toHaveProperty("password");
      }
    });

    it("should return conflict when email already exists", async () => {
      const userData = {
        name: "Maires Souza",
        email: "maires@gmail.com",
        password: "123456",
      };

      await authService.register(userData);

      const response = await authService.register(userData);

      expect(response.status).toBe("CONFLICT");
      expect(response.data).toEqual({
        message: "Email already in use!",
      });
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await authService.register({
        name: "Maires Souza",
        email: "maires@gmail.com",
        password: "123456",
      });
    });

    it("should login successfully and return token", async () => {
      const response = await authService.login({
        email: "maires@gmail.com",
        password: "123456",
      });

      expect(response.data).toHaveProperty("token");
      if (response.status === "SUCCESSFUL") {
        expect(typeof response.data.token).toBe("string");
      }
    });

    it("should return UNAUTHORIZED with wrong password", async () => {
      const response = await authService.login({
        email: "maires@gmail.com",
        password: "senhaErrada",
      });

      expect(response.status).toBe("UNAUTHORIZED");
      expect(response.data).toEqual({
        message: "Invalid email or password!",
      });
    });

    it("should return UNAUTHORIZED with non-existent email", async () => {
      const response = await authService.login({
        email: "naoexiste@gmail.com",
        password: "123456",
      });
      expect(response.status).toBe("UNAUTHORIZED");
      expect(response.data).toEqual({
        message: "Invalid email or password!",
      });
    });
  });
});

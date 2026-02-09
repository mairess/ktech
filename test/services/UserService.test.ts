import { UserService } from "../../src/services/UserService";
import { AuthService } from "../../src/services/AuthService";

describe("UserService", () => {
  const userService = new UserService();
  const authService = new AuthService();

  let userId: string;

  beforeEach(async () => {
    // Cria um usuário para os testes
    const response = await authService.register({
      name: "Maires Souza",
      email: "maires@gmail.com",
      password: "123456",
    });
    if (response.status === "CREATED") {
      userId = response.data._id.toString();
    }
  });

  describe("findById", () => {
    it("should return user by id", async () => {
      const response = await userService.findById(userId);

      expect(response.status).toBe("SUCCESSFUL");

      if (response.status === "SUCCESSFUL") {
        expect(response.data.name).toBe("Maires Souza");
        expect(response.data.email).toMatch("maires@gmail.com");
      }
    });

    it("should return NOT_FOUND for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await userService.findById(fakeId);

      expect(response.status).toBe("NOT_FOUND");
      expect(response.data).toEqual({ message: "User not found!" });
    });
  });

  describe("updateById", () => {
    it("should update user name", async () => {
      const response = await userService.updateById(
        {
          name: "Maires Atualizado",
        },
        userId,
      );

      if (response.status === "SUCCESSFUL") {
        expect(response.data?.name).toBe("Maires Atualizado");
        expect(response.data?.email).toBe("maires@gmail.com");
      }
    });

    it("should update user email", async () => {
      const response = await userService.updateById(
        {
          email: "novoemail@gmail.com",
        },
        userId,
      );

      if (response.status === "SUCCESSFUL") {
        expect(response.data?.email).toBe("novoemail@gmail.com");
      }
    });

    it("should return NOT_FOUND when updating non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await userService.updateById(
        {
          name: "Teste",
        },
        fakeId,
      );

      expect(response.status).toBe("NOT_FOUND");
      expect(response.data).toEqual({
        message: "User not found!",
      });
    });
  });

  describe("deleteById", () => {
    it("should delete user successfully", async () => {
      const response = await userService.deleteById(userId);

      expect(response.status).toBe("SUCCESSFUL");
      expect(response.data).toEqual({ message: "User deleted successfully!" });

      const notFoundResponse = await userService.findById(userId);
      expect(notFoundResponse.status).toBe("NOT_FOUND");
      expect(notFoundResponse.data).toEqual({
        message: "User not found!",
      });
    });

    it("should return NOT_FOUND when deleting non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await userService.deleteById(fakeId);

      expect(response.status).toBe("NOT_FOUND");
      expect(response.data).toEqual({
        message: "User not found!",
      });
    });
  });
});

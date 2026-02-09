import request from "supertest";
import { app } from "../../src/app";

describe("Controllers - Authenticated Routes", () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    const registerResponse = await request(app).post("/auth").send({
      name: "Maires Souza",
      email: "maires@gmail.com",
      password: "123456",
    });

    userId = registerResponse.body._id;

    const loginResponse = await request(app).post("/auth/login").send({
      email: "maires@gmail.com",
      password: "123456",
    });

    token = loginResponse.body.token;
  });

  describe("GET /auth/me", () => {
    it("should return the logged user data", async () => {
      const response = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Maires Souza");
      expect(response.body.email).toBe("maires@gmail.com");
      expect(response.body).not.toHaveProperty("password");
    });

    it("should return 401 without token", async () => {
      const response = await request(app).get("/auth/me");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Token not provided!" });
    });

    it("should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/auth/me")
        .set("Authorization", "Bearer tokenInvalido123");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Token must be a valid token!",
      });
    });
  });

  describe("PUT /users/:id", () => {
    it("should update user name successfully", async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Maires Atualizado",
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Maires Atualizado");
    });

    it("should update user email successfully", async () => {
      const response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "novoemail@gmail.com",
        });

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("novoemail@gmail.com");
    });

    it("should return 401 without token", async () => {
      const response = await request(app).put(`/users/${userId}`).send({
        name: "Tentativa Sem Token",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Token not provided!" });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete user successfully", async () => {
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "User deleted successfully!" });
    });

    it("should return 401 without token", async () => {
      const response = await request(app).delete(`/users/${userId}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: "Token not provided!",
      });
    });

    it("should return 401 or 404 when using token of deleted user", async () => {
      await request(app)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      const response = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect([401, 404]).toContain(response.status);
    });
  });
});

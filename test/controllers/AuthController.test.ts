import request from "supertest";
import { app } from "../../src/app";

describe("User Creation", () => {
  it("should register a user successfully", async () => {
    const response = await request(app).post("/auth").send({
      name: "Maires Souza",
      email: "maires@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("Maires Souza");
  });
});

describe("User Login", () => {
  it("should login successfully and return a token", async () => {
    await request(app).post("/auth").send({
      name: "Maires Souza",
      email: "maires@gmail.com",
      password: "123456",
    });

    const response = await request(app).post("/auth/login").send({
      email: "maires@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail login with wrong password", async () => {
    await request(app).post("/auth").send({
      name: "Maires Souza",
      email: "maires@gmail.com",
      password: "123456",
    });

    const response = await request(app).post("/auth/login").send({
      email: "maires@gmail.com",
      password: "senhaErrada",
    });

    expect(response.status).toBe(401);
  });

  it("should fail login with non-existent user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "naoexiste@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
  });
});

import request from "supertest";
import app from "../src/app";

describe("Auth", () => {
  it("deve logar com credenciais válidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@perfumes.com", password: "admin123" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("deve falhar com 401", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "admin@perfumes.com", password: "errada" });
    expect(res.status).toBe(401);
  });
});

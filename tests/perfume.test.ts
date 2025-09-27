import request from "supertest";
import app from "../src/app";

async function login() {
  const res = await request(app)
    .post("/auth/login")
    .send({ email: "admin@perfumes.com", password: "admin123" });
  return res.body.token as string;
}

describe("Perfumes", () => {
  it("CRUD básico", async () => {
    const token = await login();

    // create
    const created = await request(app)
      .post("/perfumes")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Sauvage", marca: "Dior", ml: 100 });
    expect(created.status).toBe(201);
    const id = created.body.id;

    // list
    const list = await request(app)
      .get("/perfumes")
      .set("Authorization", `Bearer ${token}`);
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);

    // get
    const got = await request(app)
      .get(`/perfumes/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(got.status).toBe(200);

    // update
    const updated = await request(app)
      .put(`/perfumes/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ preco: 550 });
    expect(updated.status).toBe(200);

    // delete
    const del = await request(app)
      .delete(`/perfumes/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(204);
  });
});

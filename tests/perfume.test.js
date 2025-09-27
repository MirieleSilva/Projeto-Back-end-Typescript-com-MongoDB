"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
async function login() {
    const res = await (0, supertest_1.default)(app_1.default)
        .post("/auth/login")
        .send({ email: "admin@perfumes.com", password: "admin123" });
    return res.body.token;
}
describe("Perfumes", () => {
    it("CRUD básico", async () => {
        const token = await login();
        // create
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/perfumes")
            .set("Authorization", `Bearer ${token}`)
            .send({ nome: "Sauvage", marca: "Dior", ml: 100 });
        expect(created.status).toBe(201);
        const id = created.body.id;
        // list
        const list = await (0, supertest_1.default)(app_1.default)
            .get("/perfumes")
            .set("Authorization", `Bearer ${token}`);
        expect(list.status).toBe(200);
        expect(Array.isArray(list.body)).toBe(true);
        // get
        const got = await (0, supertest_1.default)(app_1.default)
            .get(`/perfumes/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(got.status).toBe(200);
        // update
        const updated = await (0, supertest_1.default)(app_1.default)
            .put(`/perfumes/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ preco: 550 });
        expect(updated.status).toBe(200);
        // delete
        const del = await (0, supertest_1.default)(app_1.default)
            .delete(`/perfumes/${id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(del.status).toBe(204);
    });
});

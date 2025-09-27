"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("Auth", () => {
    it("deve logar com credenciais válidas", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/auth/login")
            .send({ email: "admin@perfumes.com", password: "admin123" });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
    it("deve falhar com 401", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/auth/login")
            .send({ email: "admin@perfumes.com", password: "errada" });
        expect(res.status).toBe(401);
    });
});

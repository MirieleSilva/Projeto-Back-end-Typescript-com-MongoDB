import { PerfumeService } from "../services/perfume.service";
import { EstoqueService } from "../services/estoque.service";
import { AuthService } from "../services/auth.service";

import { PerfumeMongoRepository } from "../repositories/mongo/perfume.mongo.repository";
import { EstoqueMongoRepository } from "../repositories/mongo/estoque.mongo.repository";
import { UserMongoRepository } from "../repositories/mongo/user.mongo.repository";

import { PerfumeRepository as PerfumeMemoryRepository } from "../repositories/memory/perfume.memory.repository";
import { EstoqueRepository as EstoqueMemoryRepository } from "../repositories/memory/estoque.memory.repository";
import { UserRepository as UserMemoryRepository } from "../repositories/memory/user.memory.repository";

const isMongo = (process.env.DATA_LAYER ?? "mongo") === "mongo";

export function makePerfumeService() {
  console.log("[wire][perfume] repo:", isMongo ? "Mongo" : "Memory");
  const repo = isMongo ? new PerfumeMongoRepository() : new PerfumeMemoryRepository();
  return new PerfumeService(repo as any);
}

export function makeEstoqueService() {
  console.log("[wire][estoque] repo:", isMongo ? "Mongo" : "Memory");
  const repo = isMongo ? new EstoqueMongoRepository() : new EstoqueMemoryRepository();
  return new EstoqueService(repo as any);
}

export function makeAuthService() {
  console.log("[wire][auth] repo:", isMongo ? "Mongo" : "Memory");
  const repo = isMongo ? new UserMongoRepository() : new UserMemoryRepository();
  return new AuthService(repo as any);
}

export async function seedIfNeeded() {
  if (isMongo) {
    const userRepo = new UserMongoRepository();
    await userRepo.seedAdmin?.();
  }
}



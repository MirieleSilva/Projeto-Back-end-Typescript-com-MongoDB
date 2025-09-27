import { IUserRepository } from "../interfaces/user.repository.interface";
import { User } from "../../models/user.model";
import { UserModel } from "../../infra/mongo/schema/user.schema"; 
import bcrypt from "bcrypt";

export class UserMongoRepository implements IUserRepository {
  toDomain(doc: any): User {
    return { id: String(doc._id), name: doc.name, email: doc.email, password: doc.password, role: doc.role };
  }

  async findByEmail(email: string): Promise<User|null> {
    const doc = await UserModel.findOne({ email }).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async seedAdmin(): Promise<void> {
    const exists = await UserModel.findOne({ email: "admin@perfumes.com" }).lean();
    if (!exists) {
      const password = await bcrypt.hash("admin123", Number(process.env.BCRYPT_ROUNDS ?? 10));
      await UserModel.create({ name: "Admin", email: "admin@perfumes.com", password, role: "admin" });
    }
  }
}

import { User } from "../../models/user.model";
import { v4 as uuid } from "uuid";

export class UserRepository {
  private users = new Map<string, User>();

  constructor() {
    const admin: User = {
      id: uuid(),
      name: "Admin",
      email: "admin@perfumes.com",
      password: "admin123",
      role: "admin",
    };
    this.users.set(admin.email, admin);
  }

  findByEmail(email: string) {
    return this.users.get(email) ?? null;
  }
}

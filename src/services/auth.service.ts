import { IUserRepository } from "../repositories/interfaces/user.repository.interface";
import { signToken } from "../utils/jwt.util";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private users: IUserRepository) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) {
      const err = new Error("Credenciais inválidas"); (err as any).status = 401; throw err;
    }

    const ok = user.password.startsWith("$2")
      ? await bcrypt.compare(password, user.password)
      : user.password === password;

    if (!ok) {
      const err = new Error("Credenciais inválidas"); (err as any).status = 401; throw err;
    }

    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}


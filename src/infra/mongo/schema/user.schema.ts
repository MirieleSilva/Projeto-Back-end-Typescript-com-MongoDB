import { Schema, model, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const rounds = Number(process.env.BCRYPT_ROUNDS ?? 10);

export const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.set("password", await bcrypt.hash(this.get("password"), rounds));
  next();
});

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: string };
export const UserModel = model("User", UserSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  userName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

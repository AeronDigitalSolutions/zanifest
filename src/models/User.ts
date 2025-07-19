import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);
export default User;

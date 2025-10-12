/* eslint-disable */

import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

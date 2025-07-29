import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  salt: String,
  password: String,
  lastRoadmap: Number,
  menthoring: [Number],
});
const UserDB = models.User || model("User", UserSchema);

export default UserDB;

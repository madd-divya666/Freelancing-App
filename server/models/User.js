import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  usertype: String
});

export default mongoose.model("users", userSchema);

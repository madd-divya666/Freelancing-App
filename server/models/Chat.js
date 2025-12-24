import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  _id: String,
  messages: { type: Array, default: [] }
});

export default mongoose.model("chats", chatSchema);

import Chat from "../models/Chat.js";
import { v4 as uuid } from "uuid";

const socketHandler = (io, socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join-chat-room", async ({ projectId }) => {
    socket.join(projectId);

    let chat = await Chat.findById(projectId);
    if (!chat) chat = await Chat.create({ _id: projectId, messages: [] });

    socket.emit("message-from-user");
  });

  socket.on("new-message", async ({ projectId, senderId, message, time }) => {
    await Chat.findByIdAndUpdate(projectId, {
      $push: {
        messages: {
          id: uuid(),
          senderId,
          text: message,
          time,
        },
      },
    });

    io.to(projectId).emit("message-from-user");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
};

export default socketHandler;

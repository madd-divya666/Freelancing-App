import Chat from "../models/Chat.js";

export const getChat = async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.json(chat);
};

import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import socketHandler from "./sockets/socketHandler.js";

import authRoutes from "./routes/auth.routes.js";
import freelancerRoutes from "./routes/freelancer.routes.js";
import projectRoutes from "./routes/project.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import chatRoutes from "./routes/chat.routes.js";
dotenv.config();

const app = express();

// ---------- MIDDLEWARE ----------
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/freelancer", freelancerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/chats", chatRoutes);

// ---------- SERVE CLIENT ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// ---------- SERVER + SOCKET ----------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socketHandler(io, socket);
});

// ---------- DB + START ----------
connectDB();

const PORT = process.env.PORT || 6001;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

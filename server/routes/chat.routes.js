import express from "express";
import { getChat } from "../controllers/chat.controller.js";

const router = express.Router();
router.get("/:id", getChat);
export default router;

import express from "express";
import {
  getFreelancer,
  updateFreelancer,
} from "../controllers/freelancer.controller.js";

const router = express.Router();
router.get("/:id", getFreelancer);
router.put("/", updateFreelancer);
export default router;

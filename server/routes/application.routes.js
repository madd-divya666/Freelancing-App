import express from "express";
import {
  getApplications,
  createBid,
  rejectApplication,
  approveApplication,
} from "../controllers/application.controller.js";

const router = express.Router();
router.get("/", getApplications);
router.post("/bid", createBid);
router.get("/approve/:id", approveApplication);
router.get("/reject/:id", rejectApplication);
export default router;

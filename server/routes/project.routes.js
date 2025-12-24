import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  submitProject,
  approveSubmission,
  rejectSubmission,
} from "../controllers/project.controller.js";

const router = express.Router();

/* CRUD */
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProject);

/* Submission */
router.post("/submit", submitProject);
router.get("/approve-submission/:projectId", approveSubmission);
router.get("/reject-submission/:projectId", rejectSubmission);

export default router;

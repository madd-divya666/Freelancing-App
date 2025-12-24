import Project from "../models/Project.js";

/* ---------------- CREATE PROJECT ---------------- */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      postedDate: new Date(),
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Project creation failed" });
  }
};

/* ---------------- GET ALL PROJECTS ---------------- */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* ---------------- GET SINGLE PROJECT ---------------- */
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/* ---------------- SUBMIT PROJECT ---------------- */
export const submitProject = async (req, res) => {
  try {
    const { projectId, projectLink, manualLink, submissionDescription } =
      req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.projectLink = projectLink;
    project.manualLink = manualLink;
    project.submissionDescription = submissionDescription;
    project.submission = true;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Submission failed" });
  }
};

/* ---------------- APPROVE SUBMISSION ---------------- */
export const approveSubmission = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.submissionAccepted = true;
    project.status = "Completed";

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* ---------------- REJECT SUBMISSION ---------------- */
export const rejectSubmission = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.submission = false;
    project.projectLink = "";
    project.manualLink = "";
    project.submissionDescription = "";

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};

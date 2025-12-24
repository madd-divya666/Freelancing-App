import Application from "../models/Application.js";
import Project from "../models/Project.js";

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

export const createBid = async (req, res) => {
  try {
    const bid = await Application.create(req.body);
    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: "Bid creation failed" });
  }
};

export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "Accepted";
    await application.save();

    await Project.findByIdAndUpdate(application.projectId, {
      freelancerId: application.freelancerId,
      freelancerName: application.freelancerName,
      status: "Assigned",
    });

    await Application.updateMany(
      {
        projectId: application.projectId,
        _id: { $ne: application._id },
      },
      { status: "Rejected" }
    );

    res.json({ message: "Application approved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "Rejected";
    await application.save();

    res.json({ message: "Application rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Rejection failed" });
  }
};

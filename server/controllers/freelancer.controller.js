import Freelancer from "../models/Freelancer.js";

/**
 * GET freelancer by userId
 * GET /api/freelancer/:id
 */
export const getFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({
      userId: req.params.id,
    });

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);
  } catch (err) {
    console.error("Get freelancer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFreelancer = async (req, res) => {
  try {
    const { freelancerId, skills, description } = req.body;

    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

  
    if (Array.isArray(skills)) {
      freelancer.skills = skills;
    } else if (typeof skills === "string") {
      freelancer.skills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    freelancer.description = description || freelancer.description;

    await freelancer.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      freelancer,
    });
  } catch (err) {
    console.error("Update freelancer error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

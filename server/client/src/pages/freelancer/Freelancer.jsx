import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Freelancer = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [freelancerData, setFreelancerData] = useState(null);
  const [applicationsCount, setApplicationsCount] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");

  const [updateSkills, setUpdateSkills] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [freelancerId, setFreelancerId] = useState("");

  /* ---------------- FETCH FREELANCER ---------------- */
  const fetchUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/freelancer/${userId}`);
      if (data) {
        setFreelancerData(data);
        setFreelancerId(data._id);
        setSkills(data.skills || []);
        setDescription(data.description || "");
        setUpdateSkills((data.skills || []).join(", "));
        setUpdateDescription(data.description || "");
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  /* ---------------- FETCH APPLICATIONS ---------------- */
  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/applications");
      setApplicationsCount(data.filter((a) => a.freelancerId === userId));
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
    fetchApplications();
  }, [fetchUserData, fetchApplications]);

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateUserData = async () => {
    try {
      await axios.put("/api/freelancer", {
        freelancerId,
        skills: updateSkills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        description: updateDescription,
      });

      setIsEditOpen(false);
      fetchUserData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!freelancerData) return null;

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div className="container">
        {/* ================= DASHBOARD STATS ================= */}
        <div className="row g-4 mb-5">
          {[
            {
              title: "Current Projects",
              value: freelancerData.currentProjects?.length || 0,
              action: () => navigate("/my-projects"),
            },
            {
              title: "Completed Projects",
              value: freelancerData.completedProjects?.length || 0,
              action: () => navigate("/my-projects"),
            },
            {
              title: "Applications",
              value: applicationsCount.length,
              action: () => navigate("/myApplications"),
            },
            {
              title: "Total Earnings",
              value: `₹ ${freelancerData.funds || 0}`,
            },
          ].map((card, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div
                className="p-4 rounded-5 shadow-sm text-center h-100"
                style={{
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <small className="text-muted fw-semibold">{card.title}</small>
                <h2 className="fw-bold my-2">{card.value}</h2>

                {card.action && (
                  <button
                    className="btn btn-outline-success btn-sm rounded-pill px-4"
                    onClick={card.action}
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div
          className="p-5 rounded-5 shadow-sm"
          style={{
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold mb-1">My Profile</h3>
              <p className="text-muted mb-0">
                Manage your skills & professional info
              </p>
            </div>

            {!isEditOpen && (
              <button
                className="btn btn-outline-success rounded-pill px-4"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* ---------- VIEW MODE ---------- */}
          {!isEditOpen ? (
            <>
              <div className="mb-4">
                <h6 className="fw-semibold mb-2">Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-pill"
                        style={{
                          background: "#eef2ff",
                          fontSize: "0.8rem",
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No skills added</span>
                  )}
                </div>
              </div>

              <div>
                <h6 className="fw-semibold mb-2">About Me</h6>
                <p className="text-muted">
                  {description || "No description added"}
                </p>
              </div>
            </>
          ) : (
            /* ---------- EDIT MODE ---------- */
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  className="form-control rounded-4"
                  value={updateSkills}
                  onChange={(e) => setUpdateSkills(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control rounded-4"
                  rows="4"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success rounded-pill px-4"
                  onClick={updateUserData}
                >
                  Save Changes
                </button>
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Freelancer;

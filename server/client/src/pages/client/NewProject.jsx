import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");

  // ---------------- SUBMIT ----------------
  const handleSubmit = useCallback(async () => {
    try {
      await axios.post("/api/projects", {
        title,
        description,
        budget,
        skills,
        clientId: localStorage.getItem("userId"),
        clientName: localStorage.getItem("username"),
        clientEmail: localStorage.getItem("email"),
      });

      alert("New project added successfully!");
      navigate("/client");
    } catch (err) {
      alert("Operation failed!");
      console.error(err);
    }
  }, [title, description, budget, skills, navigate]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold text-success mb-4 text-center">
                Post a New Project
              </h3>

              {/* Project Title */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Project Title</label>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  style={{ height: "120px" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Description</label>
              </div>

              {/* Budget */}
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <label>Budget (₹)</label>
              </div>

              {/* Skills */}
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <label>Required skills (comma separated)</label>
              </div>

              {/* Actions */}
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/client")}
                >
                  Cancel
                </button>

                <button className="btn btn-success px-4" onClick={handleSubmit}>
                  Submit Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;

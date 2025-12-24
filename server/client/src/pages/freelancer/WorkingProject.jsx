import React from "react";

const WorkingProject = () => {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: "#2f3e46" }}>
          Working Project
        </h3>

        <span className="badge px-3 py-2" style={{ background: "#84a98c" }}>
          In Progress
        </span>
      </div>

      {/* Project Card */}
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          {/* Title */}
          <h4 className="fw-semibold mb-2" style={{ color: "#344e41" }}>
            Build MERN Freelancing Platform
          </h4>

          {/* Meta */}
          <div className="d-flex flex-wrap gap-3 text-muted mb-3">
            <span>💰 Budget: ₹15,000</span>
            <span>⏳ Deadline: 10 days</span>
            <span>👤 Client: John Doe</span>
          </div>

          {/* Description */}
          <p className="mb-4">
            Develop a full-stack freelancing platform using MERN stack. Features
            include authentication, project posting, bidding, real-time chat,
            and project submission workflow.
          </p>

          {/* Skills */}
          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Required Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {["React", "Node.js", "MongoDB", "Socket.io"].map((skill) => (
                <span
                  key={skill}
                  className="badge text-dark border"
                  style={{ background: "#edf6f9" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Progress</h6>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: "60%",
                  backgroundColor: "#52796f",
                }}
              ></div>
            </div>
            <small className="text-muted">60% completed</small>
          </div>

          {/* Actions */}
          <div className="d-flex flex-wrap gap-3">
            <button
              className="btn px-4"
              style={{
                background: "#52796f",
                color: "white",
              }}
            >
              Open Chat
            </button>

            <button
              className="btn px-4"
              style={{
                background: "#cad2c5",
                color: "#2f3e46",
              }}
            >
              View Details
            </button>

            <button
              className="btn px-4"
              style={{
                background: "#84a98c",
                color: "white",
              }}
            >
              Submit Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingProject;

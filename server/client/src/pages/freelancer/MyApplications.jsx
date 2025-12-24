import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  // ---------------- FETCH APPLICATIONS ----------------
  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/applications");

      const myApps = data
        .filter((app) => app.freelancerId === localStorage.getItem("userId"))
        .reverse();

      setApplications(myApps);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-success mb-4">My Applications</h3>

      <div className="row g-4">
        {applications.map((app) => (
          <div className="col-12" key={app._id}>
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <div className="row g-4">
                  {/* Project Info */}
                  <div className="col-md-6">
                    <h5 className="fw-bold">{app.title}</h5>
                    <p className="text-muted small">{app.description}</p>

                    <div className="mb-2">
                      <strong>Required Skills</strong>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {app.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="badge bg-light text-dark border"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="fw-semibold">Budget: ₹ {app.budget}</p>
                  </div>

                  {/* Application Info */}
                  <div className="col-md-6 border-start">
                    <strong>Proposal</strong>
                    <p className="text-muted small mt-1">{app.proposal}</p>

                    <div className="mb-2">
                      <strong>Your Skills</strong>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {app.freelancerSkills.map((skill) => (
                          <span
                            key={skill}
                            className="badge bg-secondary-subtle text-dark"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="fw-semibold">
                      Proposed Budget: ₹ {app.bidAmount}
                    </p>

                    <span
                      className={`badge ${
                        app.status === "Accepted"
                          ? "bg-success"
                          : app.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {applications.length === 0 && (
          <div className="text-center text-muted mt-5">
            <h5>No applications yet</h5>
            <p>Start applying to projects to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;

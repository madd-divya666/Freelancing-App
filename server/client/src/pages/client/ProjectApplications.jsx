import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ProjectApplications = () => {
  const [applications, setApplications] = useState([]);
  const [displayApplications, setDisplayApplications] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);

  // ---------------- FETCH ----------------
  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/applications");

      const clientApps = data.filter(
        (app) => app.clientId === localStorage.getItem("userId")
      );

      setApplications(clientApps);
      setDisplayApplications([...clientApps].reverse());

      const titles = [...new Set(clientApps.map((app) => app.title))];
      setProjectTitles(titles);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // ---------------- ACTIONS ----------------
  const handleApprove = async (id) => {
    try {
      await axios.get(`/api/applications/approve/${id}`);
      alert("Application approved");
      fetchApplications();
    } catch {
      alert("Operation failed!");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.get(`/api/applications/reject/${id}`);
      alert("Application rejected");
      fetchApplications();
    } catch {
      alert("Operation failed!");
    }
  };

  // ---------------- FILTER ----------------
  const handleFilterChange = (value) => {
    if (!value) {
      setDisplayApplications([...applications].reverse());
    } else {
      setDisplayApplications(
        applications.filter((app) => app.title === value).reverse()
      );
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success mb-2">Project Applications</h3>

        <select
          className="form-select w-auto"
          defaultValue=""
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Projects</option>
          {projectTitles.map((title) => (
            <option key={`${title}-${Date.now}`} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Applications */}
      <div className="row g-4">
        {displayApplications.map((app) => (
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

                    <p className="fw-semibold mt-2">Budget: ₹ {app.budget}</p>
                  </div>

                  {/* Freelancer Info */}
                  <div className="col-md-6 border-start">
                    <strong>Proposal</strong>
                    <p className="text-muted small mt-1">{app.proposal}</p>

                    <div className="mb-2">
                      <strong>Freelancer Skills</strong>
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

                    {/* Actions */}
                    {app.status === "Pending" ? (
                      <div className="d-flex gap-2 mt-3">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleApprove(app._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleReject(app._id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`badge mt-3 ${
                          app.status === "Accepted" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {app.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {displayApplications.length === 0 && (
          <div className="text-center text-muted mt-5">
            <h5>No applications found</h5>
            <p>Applications will appear once freelancers apply.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectApplications;

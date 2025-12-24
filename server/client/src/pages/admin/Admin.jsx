import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProjectsCount, setCompletedProjectsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetchProjects();
    fetchApplications();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects");

      setProjectsCount(data.length);
      setCompletedProjectsCount(
        data.filter((p) => p.status === "Completed").length
      );
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/api/applications");
      setApplicationsCount(data.length);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <div className="row g-4">
        {/* Projects */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body text-center">
              <h6 className="text-muted">All Projects</h6>
              <h2 className="fw-bold">{projectsCount}</h2>
              <button
                className="btn btn-outline-dark btn-sm mt-2"
                onClick={() => navigate("/admin-projects")}
              >
                View Projects
              </button>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body text-center">
              <h6 className="text-muted">Completed Projects</h6>
              <h2 className="fw-bold">{completedProjectsCount}</h2>
              <button
                className="btn btn-outline-dark btn-sm mt-2"
                onClick={() => navigate("/admin-projects")}
              >
                View
              </button>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body text-center">
              <h6 className="text-muted">Applications</h6>
              <h2 className="fw-bold">{applicationsCount}</h2>
              <button
                className="btn btn-outline-dark btn-sm mt-2"
                onClick={() => navigate("/admin-applications")}
              >
                View
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0 rounded-4 bg-light">
            <div className="card-body text-center">
              <h6 className="text-muted">System</h6>
              <h5 className="fw-bold">Running</h5>
              <p className="text-muted small mb-0">
                Backend connected successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

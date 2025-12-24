import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  // ---------------- FETCH PROJECTS ----------------
  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/projects");

      const myProjects = data.filter(
        (project) => project.freelancerId === localStorage.getItem("userId")
      );

      setProjects(myProjects);
      setDisplayProjects([...myProjects].reverse());
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ---------------- FILTER ----------------
  const handleFilterChange = (value) => {
    if (!value) {
      setDisplayProjects([...projects].reverse());
      return;
    }

    if (value === "In Progress") {
      setDisplayProjects(
        projects.filter((p) => p.status === "Assigned").reverse()
      );
    }

    if (value === "Completed") {
      setDisplayProjects(
        projects.filter((p) => p.status === "Completed").reverse()
      );
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success mb-2">My Projects</h3>

        <select
          className="form-select w-auto"
          defaultValue=""
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="">All Projects</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Project List */}
      <div className="row g-4">
        {displayProjects.map((project) => (
          <div className="col-md-6 col-lg-4" key={project._id}>
            <div
              className="card h-100 shadow-sm border-0 rounded-4"
              role="button"
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="card-body d-flex flex-column">
                <div className="mb-2">
                  <h5 className="fw-bold mb-1">{project.title}</h5>
                  <small className="text-muted">
                    {String(project.postedDate).slice(0, 25)}
                  </small>
                </div>

                <p className="text-muted small flex-grow-1">
                  {project.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <strong>₹ {project.budget}</strong>

                  <span
                    className={`badge rounded-pill ${
                      project.status === "Completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {displayProjects.length === 0 && (
          <div className="text-center text-muted mt-5">
            <h5>No projects found</h5>
            <p>Assigned projects will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;

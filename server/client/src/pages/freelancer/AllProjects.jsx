import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  /* ---------------- FETCH PROJECTS ---------------- */
  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/projects");

      setProjects(data);
      setDisplayProjects([...data].reverse());

      const skillsSet = new Set();
      data.forEach((project) => {
        project.skills.forEach((skill) => skillsSet.add(skill));
      });

      setAllSkills([...skillsSet]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /* ---------------- FILTER ---------------- */
  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects
          .filter((project) =>
            categoryFilter.every((skill) => project.skills.includes(skill))
          )
          .reverse()
      );
    } else {
      setDisplayProjects([...projects].reverse());
    }
  }, [categoryFilter, projects]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter((prev) => [...prev, value]);
    } else {
      setCategoryFilter((prev) => prev.filter((s) => s !== value));
    }
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <div className="container-fluid">
        <div className="row g-4">
          {/* ================= FILTER PANEL ================= */}
          <div className="col-lg-3">
            <div
              className="p-4 rounded-5 shadow-sm"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h5 className="fw-bold mb-3">Filters</h5>

              <small className="text-uppercase text-muted fw-semibold">
                Skills
              </small>

              <div className="mt-3 d-flex flex-column gap-2">
                {allSkills.length > 0 ? (
                  allSkills.map((skill) => (
                    <label
                      key={skill}
                      className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                      style={{
                        background: "#f1f5f9",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        value={skill}
                        onChange={handleCategoryCheckBox}
                      />
                      <span>{skill}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-muted small">No skills available</p>
                )}
              </div>
            </div>
          </div>

          {/* ================= PROJECT LIST ================= */}
          <div className="col-lg-9">
            <div className="mb-4">
              <h2 className="fw-bold mb-1">All Projects</h2>
              <p className="text-muted">
                Discover projects that match your skills ✨
              </p>
            </div>

            <div className="row g-4">
              {displayProjects.map((project) => (
                <div className="col-md-6 col-xl-4" key={project._id}>
                  <div
                    className="h-100 p-4 rounded-5 shadow-sm"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => navigate(`/project/${project._id}`)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-6px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    {/* Header */}
                    <div className="mb-2">
                      <h5 className="fw-bold mb-1">{project.title}</h5>
                      <small className="text-muted">
                        {String(project.postedDate).slice(0, 24)}
                      </small>
                    </div>

                    {/* Description */}
                    <p className="text-muted small mb-3">
                      {project.description.length > 90
                        ? project.description.slice(0, 90) + "..."
                        : project.description}
                    </p>

                    {/* Skills */}
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-pill"
                          style={{
                            background: "#eef2ff",
                            fontSize: "0.75rem",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Budget</small>
                        <h6 className="fw-bold mb-0">₹ {project.budget}</h6>
                      </div>

                      <div className="text-end">
                        <small className="text-muted">
                          {project.bids.length} bids
                        </small>
                        <div className="small text-muted">
                          Avg ₹{" "}
                          {project.bids.length > 0
                            ? Math.round(
                                project.bidAmounts.reduce((a, b) => a + b, 0) /
                                  project.bids.length
                              )
                            : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {displayProjects.length === 0 && (
                <div className="text-center text-muted mt-5">
                  <h5>No projects found</h5>
                  <p>Try changing skill filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  // ---------------- FETCH PROJECTS ----------------
  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/projects");

      setProjects(data);
      setDisplayProjects([...data].reverse());

      // extract unique skills (SAFE)
      const skillsSet = new Set();
      data.forEach((project) =>
        project.skills.forEach((skill) => skillsSet.add(skill))
      );

      setAllSkills([...skillsSet]);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ---------------- FILTER ----------------
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
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* ---------------- FILTERS ---------------- */}
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Filters</h5>
              <strong className="d-block mb-2">Skills</strong>

              {allSkills.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {allSkills.map((skill) => (
                    <div className="form-check" key={skill}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={skill}
                        id={skill}
                        onChange={handleCategoryCheckBox}
                      />
                      <label className="form-check-label" htmlFor={skill}>
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No skills available</p>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- PROJECT LIST ---------------- */}
        <div className="col-lg-9">
          <h3 className="fw-bold mb-3">All Projects</h3>

          <div className="row g-4">
            {displayProjects.map((project) => (
              <div className="col-md-6 col-xl-4" key={project._id}>
                <div className="card h-100 shadow-sm border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="fw-bold">{project.title}</h5>
                    <small className="text-muted">
                      {String(project.postedDate).slice(0, 24)}
                    </small>

                    <p className="text-muted small mt-2">
                      {project.description}
                    </p>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge bg-light text-dark border"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="mb-1">
                      <b>Client:</b> {project.clientName}
                    </p>
                    <p className="mb-1">
                      <b>Email:</b> {project.clientEmail}
                    </p>

                    <div className="d-flex justify-content-between mt-2">
                      <strong>₹ {project.budget}</strong>
                      <span className="badge bg-secondary">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {displayProjects.length === 0 && (
              <div className="text-center text-muted mt-5">
                <h5>No projects found</h5>
                <p>Try adjusting filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;

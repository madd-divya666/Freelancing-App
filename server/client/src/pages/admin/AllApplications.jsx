import React, { useEffect, useState } from "react";
import axios from "axios";

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  // ---------------- FETCH APPLICATIONS ----------------
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/api/applications");
      setApplications([...data].reverse());
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">All Applications</h3>

      {applications.length === 0 ? (
        <p className="text-muted text-center">No applications found</p>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            className="card shadow-sm border-0 rounded-4 mb-4"
          >
            <div className="card-body">
              <div className="row">
                {/* -------- PROJECT SIDE -------- */}
                <div className="col-md-6">
                  <h5 className="fw-bold">{application.title}</h5>
                  <p className="text-muted">{application.description}</p>

                  <h6 className="mt-3">Required Skills</h6>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {application.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="badge bg-light text-dark border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p>
                    <b>Budget:</b> ₹ {application.budget}
                  </p>

                  <p className="mb-1">
                    <b>Client:</b> {application.clientName}
                  </p>
                  <p className="mb-1">
                    <b>Email:</b> {application.clientEmail}
                  </p>
                </div>

                {/* -------- FREELANCER SIDE -------- */}
                <div className="col-md-6 border-start">
                  <h6 className="fw-bold">Proposal</h6>
                  <p>{application.proposal}</p>

                  <h6 className="mt-3">Freelancer Skills</h6>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {application.freelancerSkills.map((skill) => (
                      <span
                        key={skill}
                        className="badge bg-light text-dark border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p>
                    <b>Proposed Budget:</b> ₹ {application.bidAmount}
                  </p>

                  <p className="mb-1">
                    <b>Freelancer:</b> {application.freelancerName}
                  </p>
                  <p className="mb-1">
                    <b>Email:</b> {application.freelancerEmail}
                  </p>

                  <span
                    className={`badge mt-2 ${
                      application.status === "Accepted"
                        ? "bg-success"
                        : application.status === "Rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllApplications;

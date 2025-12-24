import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const usertype = localStorage.getItem("usertype");
    if (usertype === "freelancer") navigate("/freelancer");
    else if (usertype === "client") navigate("/client");
    else if (usertype === "admin") navigate("/admin");
  }, [navigate]);

  return (
    <div className="min-vh-100 bg-body-tertiary">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
        <span
          className="navbar-brand fw-bold fs-4 text-success"
          role="button"
          onClick={() => navigate("/")}
        >
          Skill Dukan
        </span>

        <div className="ms-auto">
          <button
            className="btn btn-outline-success"
            onClick={() => navigate("/authenticate")}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Left */}
          <div className="col-lg-7">
            <h1 className="fw-bold display-4 text-dark">
              Where <span className="text-success">Skills</span> turn into{" "}
              <span className="text-success">Success</span>
            </h1>

            <p className="mt-4 fs-5 text-secondary">
              Skill Dukan is a trusted freelancing platform where clients hire
              faster, freelancers grow smarter, and projects are delivered with
              confidence.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <button
                className="btn btn-success btn-lg px-4"
                onClick={() => navigate("/authenticate")}
              >
                Get Started
              </button>

              <button
                className="btn btn-outline-dark btn-lg px-4"
                onClick={() => navigate("/authenticate")}
              >
                Join as Freelancer
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 text-success">Why Skill Dukan?</h5>

                <ul className="list-unstyled mb-4">
                  <li className="mb-3">
                    🟢 <strong>Faster Hiring</strong>
                    <br />
                    <small className="text-muted">
                      Get proposals from skilled freelancers instantly.
                    </small>
                  </li>

                  <li className="mb-3">
                    🟢 <strong>Transparent Payments</strong>
                    <br />
                    <small className="text-muted">
                      Clear budgets and secure project delivery.
                    </small>
                  </li>

                  <li className="mb-3">
                    🟢 <strong>Real-Time Chat</strong>
                    <br />
                    <small className="text-muted">
                      Stay connected throughout the project lifecycle.
                    </small>
                  </li>
                </ul>

                <button
                  className="btn btn-success w-100"
                  onClick={() => navigate("/authenticate")}
                >
                  Start Your Journey 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

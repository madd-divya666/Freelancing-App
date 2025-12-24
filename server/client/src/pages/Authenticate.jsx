import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const Authenticate = () => {
  const [authType, setAuthType] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-body-tertiary d-flex flex-column">
      {/* Top bar */}
      <nav className="navbar bg-white shadow-sm px-4">
        <span
          className="navbar-brand fw-bold fs-4 text-success"
          role="button"
          onClick={() => navigate("/")}
        >
          Skill Dukan
        </span>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </nav>

      {/* Auth card */}
      <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <div
          className="card border-0 shadow-lg rounded-4 w-100"
          style={{ maxWidth: 420 }}
        >
          <div className="card-body p-4">
            {authType === "login" ? (
              <Login setAuthType={setAuthType} />
            ) : (
              <Register setAuthType={setAuthType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

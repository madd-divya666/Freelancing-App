import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);
  const usertype = localStorage.getItem("usertype");

  if (!usertype) return null;

  const Brand = (
    <span
      className="navbar-brand fw-bold fs-4 text-success"
      role="button"
      onClick={() => navigate("/")}
    >
      Skill Dukan
    </span>
  );

  const NavItem = ({ label, path }) => (
    <button
      className="btn btn-link text-dark text-decoration-none fw-semibold"
      onClick={() => navigate(path)}
    >
      {label}
    </button>
  );

  return (
    <nav className="navbar bg-white shadow-sm px-4">
      {Brand}

      <div className="d-flex gap-3 align-items-center">
        {usertype === "freelancer" && (
          <>
            <NavItem label="Dashboard" path="/freelancer" />
            <NavItem label="All Projects" path="/all-projects" />
            <NavItem label="My Projects" path="/my-projects" />
            <NavItem label="Applications" path="/myApplications" />
          </>
        )}

        {usertype === "client" && (
          <>
            <NavItem label="Dashboard" path="/client" />
            <NavItem label="New Project" path="/new-project" />
            <NavItem label="Applications" path="/project-applications" />
          </>
        )}

        {usertype === "admin" && (
          <>
            <NavItem label="Dashboard" path="/admin" />
            <NavItem label="Users" path="/all-users" />
            <NavItem label="Projects" path="/admin-projects" />
            <NavItem label="Applications" path="/admin-applications" />
          </>
        )}

        <button className="btn btn-outline-success" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

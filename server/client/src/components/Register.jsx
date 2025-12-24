import React, { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

const Register = ({ setAuthType }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } =
    useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <form onSubmit={handleRegister}>
      <h3 className="fw-bold text-center mb-4 text-success">Create Account</h3>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>User Name</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Email address</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Password</label>
      </div>

      <select
        className="form-select mb-3"
        onChange={(e) => setUsertype(e.target.value)}
        required
      >
        <option value="">Select user type</option>
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
      </select>

      <button className="btn btn-success w-100 py-2">Create Account</button>

      <p className="text-center mt-3 mb-0">
        Already have an account?{" "}
        <span
          className="text-success fw-semibold"
          role="button"
          onClick={() => setAuthType("login")}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default Register;

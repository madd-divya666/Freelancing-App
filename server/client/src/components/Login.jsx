import React, { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

const Login = ({ setAuthType }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <form onSubmit={handleLogin}>
      <h3 className="fw-bold text-center mb-4 text-success">Welcome Back</h3>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
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

      <button className="btn btn-success w-100 py-2">Sign In</button>

      <p className="text-center mt-3 mb-0">
        New here?{" "}
        <span
          className="text-success fw-semibold"
          role="button"
          onClick={() => setAuthType("register")}
        >
          Create an account
        </span>
      </p>
    </form>
  );
};

export default Login;

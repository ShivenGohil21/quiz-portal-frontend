import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const justSignedUp = location.state?.justSignedUp;

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      try {
        const response = await axios.post("https://quizportal-backend-z4d9.onrender.com/api/auth/login/", {
          username,
          password,
        });

        if (response.status === 200) {
        localStorage.setItem("quizUsername", username); // ✅ Add this line
        navigate("/main", { state: { username } });
        }

      } catch (error) {
        alert("Invalid username or password");
        console.error("Login error:", error);
      }
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="login-box bg-white rounded p-4 shadow-lg d-flex">
        <div className="portal-logo text-center d-flex align-items-center justify-content-center px-5 border-end">
          <h2 className="fw-bold text-dark">EXAM PORTAL</h2>
        </div>
        <div className="form-section px-4 py-3 w-100">
          <h3 className="mb-4 text-center fw-semibold">Candidate Login</h3>

          {/* ✅ Show message if redirected from signup */}
          {justSignedUp && (
            <div className="alert alert-success text-center">
              Signup successful! Please log in.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span
                className="small text-primary"
                role="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
              <span
                className="small text-primary"
                role="button"
                onClick={() => navigate("/signup")}
              >
                New user? Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

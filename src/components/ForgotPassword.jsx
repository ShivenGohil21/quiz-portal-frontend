// ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ MISSING IMPORT
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://quizportal-backend-z4d9.onrender.com/api/forgot-password/", {
        name,
        email,
        new_password: newPassword,
      });

      if (response.status === 200) {
        alert("Password updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="login-box bg-white rounded p-4 shadow-lg d-flex">
        <div className="portal-logo text-center d-flex align-items-center justify-content-center px-5 border-end">
          <h2 className="fw-bold text-dark">EXAM PORTAL</h2>
        </div>
        <div className="form-section px-4 py-3 w-100">
          <h3 className="mb-4 text-center fw-semibold">Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

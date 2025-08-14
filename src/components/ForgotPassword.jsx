// ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ MISSING IMPORT
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [newPwdTouched, setNewPwdTouched] = useState(false);
  const [confirmPwdTouched, setConfirmPwdTouched] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasAtSymbol = /@/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasAtSymbol) {
      return "Password must include the @ symbol";
    }
    return "";
  };

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setPasswordError(validatePassword(newPasswordValue));
    if (confirmPassword) {
      setConfirmError(newPasswordValue === confirmPassword ? "" : "Passwords do not match");
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmError(value === newPassword ? "" : "Passwords do not match");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewPwdTouched(true);
    setConfirmPwdTouched(true);

    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

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
            <div className="mb-3 position-relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className={`form-control ${newPwdTouched && passwordError ? 'is-invalid' : ''}`}
                placeholder="Enter New Password"
                required
                value={newPassword}
                onChange={handleNewPasswordChange}
                onBlur={() => setNewPwdTouched(true)}
              />
              <span
                className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {newPwdTouched && passwordError && (
                <div className="invalid-feedback d-block">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${confirmPwdTouched && confirmError ? 'is-invalid' : ''}`}
                placeholder="Confirm New Password"
                required
                value={confirmPassword}
                onChange={handleConfirmChange}
                onBlur={() => setConfirmPwdTouched(true)}
              />
              <span
                className="password-toggle position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {confirmPwdTouched && confirmError && (
                <div className="invalid-feedback d-block">{confirmError}</div>
              )}
            </div>
            <div className="mb-3">
              <small className="text-muted">
                Password must contain: at least 8 characters, one uppercase letter, one lowercase letter, one number, and the @ symbol
              </small>
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

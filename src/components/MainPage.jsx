import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const username = localStorage.getItem("quizUsername") || "User";


  useEffect(() => {
    axios
      .get("https://quizportal-backend-z4d9.onrender.com/api/quizzes/")
      .then((res) => {
        setQuizzes(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage("Failed to load quizzes. Please try again.");
        console.error(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("quizUsername");
    navigate("/");
  };

  return (
    <div className="main-page bg-dark text-white min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-primary">
        <div className="fs-4 fw-bold">EXAM PORTAL</div>
        <div className="d-flex align-items-center">
          <div className="me-4 fw-semibold">Welcome, {username}</div>
          <span
            role="button"
            className="text-decoration-underline text-light me-3"
            onClick={() => navigate("/terms")}
          >
            Instructions
          </span>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Quiz List Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Available Quizzes</h2>

        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        {quizzes.length === 0 && !errorMessage ? (
          <p className="text-center text-muted">No quizzes available right now.</p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-card bg-white text-dark rounded p-4 shadow-sm mb-4"
            >
              <h4>{quiz.title}</h4>
              <p>Duration: {quiz.duration} minutes</p>
              <button
                className="btn btn-success mt-2"
                onClick={() =>
                  navigate("/quiz", { state: { quizId: quiz.id } })
                }
              >
                Start Quiz
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;

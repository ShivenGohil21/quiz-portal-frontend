import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from location state
  const {
    username: passedUsername,
    detailedResults,
    attemptValid,
  } = location.state || {};

  // Calculate score only based on correct answers
  const score = detailedResults
    ? detailedResults.reduce((acc, result) => {
        const userAnswer = result.user_answer?.trim() || "";
        const correctAnswer = result.correct_answer?.trim();
        return userAnswer === correctAnswer ? acc + 1 : acc;
      }, 0)
    : 0;

  const total = detailedResults ? detailedResults.length : 0;

  // Store username in localStorage
  useEffect(() => {
    if (passedUsername) {
      localStorage.setItem("quizUsername", passedUsername);
    }
  }, [passedUsername]);

  // Retrieve username (fallback from localStorage if not passed)
  const username = passedUsername || localStorage.getItem("quizUsername");

  // Guard in case result data is missing
  if (!username || !detailedResults) {
    return (
      <p className="text-center mt-5 text-danger">
        Missing result data. Please go back and take the quiz.
      </p>
    );
  }

  // Feedback message based on score
  const getFeedbackMessage = () => {
    const percentage = (score / total) * 100;
    if (!attemptValid) return "Your attempt was invalid. Score not counted.";
    if (percentage === 100) return "Awesome! Keep it up!";
    if (percentage >= 60) return "Good job! A little more effort!";
    return "Needs Improvement. Keep practicing!";
  };

  return (
    <div className="quiz-result-page text-white bg-dark min-vh-100 p-4">
      <h2 className="text-center mb-4">Quiz Result</h2>

      <div className="result-summary text-center mb-5">
        <h4>Username: {username}</h4>
        <h5>
          Score: {attemptValid ? `${score} / ${total}` : `Score not counted`}
        </h5>
        <p className="lead">{getFeedbackMessage()}</p>
      </div>

      <div className="container">
        {detailedResults.map((result, index) => {
          const userAnswer = result.user_answer?.trim() || "";
          const correctAnswer = result.correct_answer?.trim();
          const isCorrect = userAnswer === correctAnswer;

          return (
            <div
              key={index}
              className={`card mb-4 p-3 ${
                isCorrect ? "border-success" : "border-danger"
              }`}
            >
              <h5 className={isCorrect ? "text-success" : "text-danger"}>
                {isCorrect ? "✔" : "✘"} Q{index + 1}. {result.question}
              </h5>

              <div
                className={`p-2 mt-2 rounded ${
                  isCorrect ? "bg-success-subtle" : "bg-danger-subtle"
                }`}
              >
                <strong>Your Answer:</strong> {userAnswer || "Not Answered"}
              </div>

              {!isCorrect && (
                <div className="mt-2 p-2 rounded bg-info-subtle">
                  <strong>Correct Answer:</strong> {correctAnswer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-primary" onClick={() => navigate("/main")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default QuizResultPage;

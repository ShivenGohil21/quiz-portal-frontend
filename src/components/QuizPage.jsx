// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import './Quiz.css';
// import axios from "axios";
// import ScientificCalculator from "./ScientificCalc";
// import calculatorIcon from './calc.jpg';

// const QuizPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { username, quizId } = location.state || {};
//   const [quizData, setQuizData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [userAnswers, setUserAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [attemptValid, setAttemptValid] = useState(true);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [showCalculator, setShowCalculator] = useState(false); // <-- Added

//   useEffect(() => {
//     const enterFullScreen = () => {
//       const elem = document.documentElement;
//       if (elem.requestFullscreen) elem.requestFullscreen();
//       else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
//       else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
//     };
//     enterFullScreen();

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         alert("You exited fullscreen or pressed Escape. Your attempt is invalid. Score will not be counted.");
//         setAttemptValid(false);
//       }
//     };

//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         alert("You exited fullscreen. You will be redirected to the main page to start again.");
//         navigate("/", { replace: true });
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/quizzes/${quizId}/`)
//       .then((res) => {
//         setQuizData(res.data);
//         setTimeLeft(res.data.duration * 60);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching quiz:", err);
//         setError("Failed to load quiz.");
//         setLoading(false);
//       });
//   }, [quizId]);

//   useEffect(() => {
//     if (timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           handleSubmit(true); // auto-submit
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleAnswerChange = (questionId, optionId) => {
//     setUserAnswers({
//       ...userAnswers,
//       [questionId]: optionId
//     });
//   };

//   const handleSubmit = (isAutoSubmit = false) => {
//     if (!isAutoSubmit && Object.keys(userAnswers).length !== quizData.questions.length) {
//       alert("Please answer all questions before submitting.");
//       return;
//     }

//     let score = 0;
//     const detailedResults = quizData.questions.map((question) => {
//       const userAnswerId = userAnswers[question.id];
//       const userAnswer = question.options.find(opt => opt.id === userAnswerId)?.text;
//       const correctAnswer = question.options.find(opt => opt.is_correct)?.text;

//       if (userAnswer === correctAnswer) {
//         score += 1;
//       }

//       return {
//         question: question.question_text,
//         correct_answer: correctAnswer,
//         user_answer: userAnswer || "Not Answered"
//       };
//     });

//     if (!attemptValid) {
//       alert("Your quiz attempt is marked as invalid. Your score will not be counted.");
//       score = 0;
//     }

//     navigate('/result', {
//       state: {
//         username,
//         score,
//         total: quizData.questions.length,
//         detailedResults,
//         attemptValid,
//         timeUp: isAutoSubmit
//       }
//     });
//   };

//   const handleSidebarClick = (index) => {
//     setCurrentQuestionIndex(index);
//   };

//   const goToNextQuestion = () => {
//     if (currentQuestionIndex < quizData.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const formatTime = () => {
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   if (!location.state) {
//     navigate("/", { replace: true });
//     return null;
//   }

//   if (loading) return <p className="text-center mt-5">Loading quiz...</p>;
//   if (error) return <p className="text-danger text-center mt-5">{error}</p>;

//   const currentQuestion = quizData.questions[currentQuestionIndex];

//   return (
//     <div className="quiz-container d-flex flex-column disable-select">
//       {/* Header */}
//       <div className="quiz-header d-flex justify-content-between align-items-center px-4 py-3">
//         <h4 className="text-white fw-bold m-0">EXAM PORTAL</h4>
//         <div className="d-flex align-items-center">
//           <img
//             src={calculatorIcon}
//             alt="Calculator"
//             title="Toggle Calculator"
//             style={{ width: "28px", height: "28px", cursor: "pointer", marginRight: "15px" }}
//             onClick={() => setShowCalculator(prev => !prev)} // Toggle calculator
//           />
//           {/* <span className="text-white fw-semibold me-4">Welcome, {username}</span> */}
//           <span className="text-white fw-semibold me-4">
//             Welcome, {localStorage.getItem("quizUsername") || "Guest"}
//           </span>
//           <div className="timer-box px-3 py-2">{formatTime()}</div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="quiz-body d-flex">
//         {/* Sidebar */}
//         <div className="sidebar bg-light p-3 border-end">
//           <h5 className="mb-3">Questions</h5>
//           {quizData.questions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`question-indicator mb-2 p-2 text-center ${userAnswers[question.id] ? 'answered' : 'not-answered'}`}
//               style={{ cursor: "pointer" }}
//               onClick={() => handleSidebarClick(index)}
//             >
//               Q{index + 1}
//             </div>
//           ))}
//         </div>

//         {/* Main Quiz Content */}
//         <div className="quiz-page container py-4">
//           <div className="mb-4">
//             <h5 className="question-number no-copy">
//               Q{currentQuestionIndex + 1}. {currentQuestion.question_text.split('\n')[0]}
//             </h5>
//             <div
//               className="question-code mt-3"
//               dangerouslySetInnerHTML={{
//                 __html: currentQuestion.question_text.split('\n').slice(1).join('<br/>')
//               }}
//             ></div>

//             <ul className="list-unstyled mt-3">
//               {currentQuestion.options.map((opt) => (
//                 <li key={opt.id} className="mb-2">
//                   <input
//                     type="radio"
//                     id={`q${currentQuestion.id}_opt${opt.id}`}
//                     name={`q${currentQuestion.id}`}
//                     value={opt.id}
//                     checked={userAnswers[currentQuestion.id] === opt.id}
//                     onChange={() => handleAnswerChange(currentQuestion.id, opt.id)}
//                   />
//                   <label htmlFor={`q${currentQuestion.id}_opt${opt.id}`} className="ms-2 option">
//                     {opt.text}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="d-flex justify-content-end mt-4">
//             {currentQuestionIndex < quizData.questions.length - 1 ? (
//               <button className="btn btn-secondary" onClick={goToNextQuestion}>
//                 Next Question →
//               </button>
//             ) : (
//               <button className="btn btn-primary" onClick={() => handleSubmit(false)}>
//                 Submit Quiz
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Calculator */}
//       {showCalculator && (
//         <ScientificCalculator onClose={() => setShowCalculator(false)} />
//       )}
//     </div>
//   );
// };

// export default QuizPage;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Quiz.css';
import axios from "axios";
import ScientificCalculator from "./ScientificCalc";
import calculatorIcon from './calc.jpg';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { username, quizId } = location.state || {};
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [attemptValid, setAttemptValid] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);

  // Store username in localStorage if present
  useEffect(() => {
    if (username) {
      localStorage.setItem("quizUsername", username);
    }
  }, [username]);

  // Fullscreen mode + Escape key handling
  useEffect(() => {
    const enterFullScreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    };
    enterFullScreen();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        alert("You exited fullscreen or pressed Escape. Your attempt is invalid. Score will not be counted.");
        setAttemptValid(false);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("You exited fullscreen. You will be redirected to the main page to start again.");
        navigate("/", { replace: true });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    axios.get(`https://quizportal-backend-z4d9.onrender.com/api/quizzes/${quizId}/`)
      .then((res) => {
        setQuizData(res.data);
        setTimeLeft(res.data.duration * 60);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz.");
        setLoading(false);
      });
  }, [quizId]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(true); // auto-submit
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionId, optionId) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId
    });
  };

  const handleSubmit = (isAutoSubmit = false) => {
    if (!isAutoSubmit && Object.keys(userAnswers).length !== quizData.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let score = 0;
    const detailedResults = quizData.questions.map((question) => {
      const userAnswerId = userAnswers[question.id];
      const userAnswer = question.options.find(opt => opt.id === userAnswerId)?.text;
      const correctAnswer = question.options.find(opt => opt.is_correct)?.text;

      if (userAnswer === correctAnswer) {
        score += 1;
      }

      return {
        question: question.question_text,
        correct_answer: correctAnswer,
        user_answer: userAnswer || "Not Answered"
      };
    });

    if (!attemptValid) {
      alert("Your quiz attempt is marked as invalid. Your score will not be counted.");
      score = 0;
    }

    navigate('/result', {
      state: {
        username,
        score,
        total: quizData.questions.length,
        detailedResults,
        attemptValid,
        timeUp: isAutoSubmit
      }
    });
  };

  const handleSidebarClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!location.state) {
    navigate("/", { replace: true });
    return null;
  }

  if (loading) return <p className="text-center mt-5">Loading quiz...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="quiz-container d-flex flex-column disable-select">
      {/* Header */}
      <div className="quiz-header d-flex justify-content-between align-items-center px-4 py-3">
        <h4 className="text-white fw-bold m-0">EXAM PORTAL</h4>
        <div className="d-flex align-items-center">
          <img
            src={calculatorIcon}
            alt="Calculator"
            title="Toggle Calculator"
            style={{ width: "28px", height: "28px", cursor: "pointer", marginRight: "15px" }}
            onClick={() => setShowCalculator(prev => !prev)}
          />
          <span className="text-white fw-semibold me-4">
            Welcome, {username || localStorage.getItem("quizUsername") || "Guest"}
          </span>
          <div className="timer-box px-3 py-2">{formatTime()}</div>
        </div>
      </div>

      {/* Body */}
      <div className="quiz-body d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-light p-3 border-end">
          <h5 className="mb-3">Questions</h5>
          {quizData.questions.map((question, index) => (
            <div
              key={question.id}
              className={`question-indicator mb-2 p-2 text-center ${userAnswers[question.id] ? 'answered' : 'not-answered'}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSidebarClick(index)}
            >
              Q{index + 1}
            </div>
          ))}
        </div>

        {/* Main Quiz Content */}
        <div className="quiz-page container py-4">
          <div className="mb-4">
            <h5 className="question-number no-copy">
              Q{currentQuestionIndex + 1}. {currentQuestion.question_text.split('\n')[0]}
            </h5>
            <div
              className="question-code mt-3"
              dangerouslySetInnerHTML={{
                __html: currentQuestion.question_text.split('\n').slice(1).join('<br/>')
              }}
            ></div>

            <ul className="list-unstyled mt-3">
              {currentQuestion.options.map((opt) => (
                <li key={opt.id} className="mb-2">
                  <input
                    type="radio"
                    id={`q${currentQuestion.id}_opt${opt.id}`}
                    name={`q${currentQuestion.id}`}
                    value={opt.id}
                    checked={userAnswers[currentQuestion.id] === opt.id}
                    onChange={() => handleAnswerChange(currentQuestion.id, opt.id)}
                  />
                  <label htmlFor={`q${currentQuestion.id}_opt${opt.id}`} className="ms-2 option">
                    {opt.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex justify-content-end mt-4">
            {currentQuestionIndex < quizData.questions.length - 1 ? (
              <button className="btn btn-secondary" onClick={goToNextQuestion}>
                Next Question →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleSubmit(false)}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Calculator */}
      {showCalculator && (
        <ScientificCalculator onClose={() => setShowCalculator(false)} />
      )}
    </div>
  );
};

export default QuizPage;

// Terms.jsx
import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container bg-dark text-white min-vh-100 p-5">
      <div className="bg-white text-dark rounded p-4 shadow-lg">
        <h2 className="mb-4 text-center fw-bold">Terms & Conditions</h2>
          <ol className="fs-5">
            <li>
              Once you start the quiz, you <strong>must remain in full-screen mode</strong>. Exiting full screen will redirect you to the <strong>login page</strong>.
            </li>
            <li>
              There is a <strong>calculator icon in the header</strong>. Clicking it will open the calculator, and clicking it again will close it.
            </li>
            <li>
              When you answer a question, its number in the sidebar will turn <strong style={{ color: "green" }}>green</strong>. Unanswered questions will remain <strong style={{ color: "red" }}>red</strong>.
            </li>
            <li>
              Once you complete the quiz, your <strong>results will be displayed automatically</strong>. After that, you <strong>may exit full-screen mode</strong>.
            </li>
          </ol>

           <div className="text-center mt-4">
             <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
           </div>
         </div>
      </div>
  );
};

export default Terms;


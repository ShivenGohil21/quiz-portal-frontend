// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css"; // Reusing LoginPage styles

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/api/auth/register/", {
//         username,
//         email,
//         password,
//       });

//       if (response.status === 200 || response.status === 201) {
//         alert("Signup successful!");
//         navigate("/main"); // Redirect to MainPage after signup
//       }
//     } catch (error) {
//       console.error("Signup error:", error.response?.data || error.message);
//       alert("Signup failed: " + JSON.stringify(error.response?.data || error.message));
//     }
//   };

//   return (
//     <div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
//       <div className="login-box bg-white rounded p-4 shadow-lg d-flex">
//         <div className="portal-logo text-center d-flex align-items-center justify-content-center px-5 border-end">
//           <h2 className="fw-bold text-dark">EXAM PORTAL</h2>
//         </div>
//         <div className="form-section px-4 py-3 w-100">
//           <h3 className="mb-4 text-center fw-semibold">Sign Up</h3>
//           <form onSubmit={handleSignup}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Username"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="d-grid">
//               <button type="submit" className="btn btn-primary">Sign Up</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Reusing LoginPage styles

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://quizportal-backend-z4d9.onrender.com/api/auth/register/", {
        username,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/", { state: { justSignedUp: true } }); // ✅ Redirect to login with message
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="login-box bg-white rounded p-4 shadow-lg d-flex">
        <div className="portal-logo text-center d-flex align-items-center justify-content-center px-5 border-end">
          <h2 className="fw-bold text-dark">EXAM PORTAL</h2>
        </div>
        <div className="form-section px-4 py-3 w-100">
          <h3 className="mb-4 text-center fw-semibold">Sign Up</h3>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

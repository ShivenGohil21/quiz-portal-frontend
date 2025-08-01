// App.jsx
import { useState, useEffect } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import axios from "axios";
import MainPage from './components/MainPage';
import Terms from './components/Terms';
import Signup from "./components/Signup";
import QuizPage from "./components/QuizPage";
import QuizResultPage from './components/QuizResultPage';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {

  useEffect(() => {
  axios.get("https://quizportal-backend-z4d9.onrender.com/api/")
    .then((res) => {
      console.log("Connected:", res.data);
    })
    .catch((err) => {
      console.error("Connection failed:", err);
    });
}, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<QuizResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
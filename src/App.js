import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from './pages/register/RegisterPage';
import HomePage from "./pages/home/HomePage";
import Journal from "./pages/Journal/Journal";
import MoodTracker from "./pages/MoodTracker/DailyHeatMap";
import DailyHeatmap from "./pages/MoodTracker/DailyHeatMap";

function App() {
  return (
    <Router>
    <div className="App font-opensans">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/' element={<HomePage />} />
        <Route path='/Journal' element={<Journal />} />
        <Route path='/DailyHeatMap' element={<DailyHeatmap />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

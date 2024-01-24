import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from './pages/register/RegisterPage';
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Router>
    <div className="App font-opensans">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

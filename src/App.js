import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import './App.css';
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from './pages/register/RegisterPage';
import HomePage from "./pages/home/HomePage";
import Journal from "./pages/Journal/Journal";
import BlogPage from "./pages/Blog/BlogPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/Journal' element={<Journal />} />
        <Route path='/Blog' element={<BlogPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
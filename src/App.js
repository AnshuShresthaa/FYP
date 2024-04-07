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
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import BlogListPage from "./pages/allBlog/BlogListPage";
import MoodTracker from "./pages/MoodTracker/MoodTracker";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/Journal' element={<Journal />} />
        <Route path='/MoodTracker' element={<MoodTracker />} />
        <Route path='/allBlog' element={<BlogListPage />} />
        <Route path='/Blog/:slug' element={<BlogPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route
            path="categories/manage/edit/:slug"
            element={<EditCategories />}
          />
          <Route path="users/manage" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
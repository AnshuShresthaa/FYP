import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { images } from '../../constants';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic for handling form submission here
  };

  return (
    <MainLayout showHeader={false}>
      <form className="flex flex-col justify-center items-center px-4 py-4 bg-white max-md:px-2">
        <header className="flex gap-2 items-stretch mt-12 w-full max-w-[900px] max-md:flex-wrap max-md:mt-6 max-md:max-w-full">
          <div className="flex flex-col items-center w-4/5 max-md:w-full">
            <img
              src={images.MindArcImage}
              className="object-contain object-center mt-3 w-full ml-[-80%]"
              alt="Logo"
            />
          </div>

          <div className='w-full max-w-md mx-auto p-6'>
            <h1 className='font-roboto text-3xl text-center text-dark-hard mb-8'>
              Welcome Back to <span className="font-bold">MindArc!</span>
            </h1>

            {/* Email */}
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className='text-[#5a7184] font-semibold mb-1'>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter email'
                className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className='text-[#5a7184] font-semibold mb-1'>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter password'
                className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Remember Me Checkbox and Forgot Password Link */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className='mr-2'
                  // Add onChange handler if needed
                />
                <label htmlFor="rememberMe" className='text-[#5a7184]'>
                  Remember Me
                </label>
              </div>

              <div className="whitespace-nowrap text-zinc-500">
                <Link to="/forgot-password" aria-label="Forgot Password?">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mt-6 mb-8">
              <button className='bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 self-center' onClick={handleSubmit}>
                Login
              </button>
            </div>

            {/* Sign up Link */}
            <div className='text-center mb-8'>
              <span className='text-[#5a7184]'>Don't have an account?</span>
              <Link to="/register" className='text-blue-500 ml-1 font-semibold'>
                Sign Up
              </Link>
            </div>
          </div>
        </header>
      </form>
    </MainLayout>
  );
};

export default LoginPage;
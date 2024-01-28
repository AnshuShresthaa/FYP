import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';

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
    console.log(formData); // Handle form submission logic
  };

  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-md mx-auto border rounded-lg border-gray-300 p-6'>
          <h1 className='font-robot text-2xl font-bold text-center text-dark-hard mb-8'>Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className='text-[#5a7184] font-semibold mb-1'>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter email'
                className='placeholder-text-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className='text-[#5a7184] font-semibold mb-1'>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter password'
                className='placeholder-text-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Forgot Password Link */}
            <Link to="/forgot-password" className='text-[#5a7184] text-sm text-right block mb-4'>
              Forgot Password?
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              className='bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 self-center'
            >
              Login
            </button>

            {/* Signup Link */}
            <div className='text-center mt-4'>
              <span className='text-[#5a7184]'>Don't have an account?</span>
              <Link to="/register" className='text-blue-500 ml-1 font-semibold'>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;

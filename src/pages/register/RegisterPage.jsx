import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { images } from '../../constants';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(formData);
  };

  return (
    <MainLayout>
      <section className='container mx-auto'>
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="w-full h-screen max-md:hidden">
            <img
              src={images.SignUpImage}
              className="aspect-[1.54] object-cover object-center w-full h-full"
              alt=""
            />
          </div>
          <div className='w-full max-w-md mx-auto p-6'>
            <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>Welcome to MindArc</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              {/* Name Field */}
              <div className="flex flex-col">
                <label htmlFor="name" className='text-[#5a7184] font-semibold mb-1'>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Enter name'
                  className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                  className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
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
                  className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className='text-[#5a7184] font-semibold mb-1'>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder='Confirm password'
                  className='placeholder-[#959ead] text-dark-hard rounded-lg px-3 py-2 font-semibold block outline-none border border-[#c3cad9]'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Forgot Password Link */}
              <Link to="/forgot-password" className='text-[#5a7184] text-sm text-right'>
                Forgot Password?
              </Link>

              {/* Submit Button */}
              <button
                type="submit"
                className='bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 self-center'
              >
                Sign Up
              </button>

              {/* Login Link */}
              <div className='text-center mt-4'>
                <span className='text-[#5a7184]'>Already have an account?</span>
                <Link to="/login" className='text-blue-500 ml-1 font-semibold'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;

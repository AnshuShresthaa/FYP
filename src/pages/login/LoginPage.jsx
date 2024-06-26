import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

import { images } from '../../constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)

  const { mutate } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo && userState.userInfo.isAdmin) {
      navigate("/admin");
    } else if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <section className="container mx-auto px-5 py-10 mt-20 flex flex-col md:flex-row justify-center items-center">
      {/* Left side with image */}
      <div className="w-full md:w-1/2 max-w-md mx-auto mb-6 md:mb-0">
        <div className="flex justify-center items-center h-full">
          <img src={images.MindArcImage} alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 max-w-md mx-auto md:ml-2">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          Welcome Back to MindArc!
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] focus:border-primary ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password length must be at least 6 characters",
                },
              })}
              placeholder="Enter password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] focus:border-primary ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Login
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            Do not have an account?{" "}
            <Link to="/register" className="text-primary">
              Sign up now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

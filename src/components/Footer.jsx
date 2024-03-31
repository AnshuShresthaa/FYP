import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
  AiFillHeart,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";

import { images } from "../constants";

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-1 md:grid-cols-12 lg:grid-cols-10 gap-5 px-5 pb-5 md:py-10">
        <div className="md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-6 flex flex-col md:flex-row items-start md:items-center justify-between mb-3 mr-1">
          <div className="ml-20">
            <img
              src={images.Logo}
              alt="logo"
              className="brightness-0 invert mx-auto md:mx-0"
              style={{ maxWidth: "250px" }}
            />
            <p className="text-sm text-dark-light text-center mt-2 md:mt-0 md:text-left md:text-base lg:text-l">
              Take a moment for self-care, connect with loved ones, <br />
              and remember that you are not alone on your journey.
            </p>
          </div>
        </div>

        <div className="md:col-start-5 md:col-span-2 lg:col-start-7 lg:col-span- flex flex-col items-center justify-center mb-5 mt-5">
          <div className="mx-auto md:mr-auto">
            <h3 className="text-dark-light font-bold md:text-lg text-center md:text-left">
              Quick Links
            </h3>
            <ul className="text-[#959EAD] text-sm mt-2 md:mt-5 space-y-4 md:text-base">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/allBlog">Blog</a>
              </li>
              <li>
                <a href="/">Mood Tracker</a>
              </li>
              <li>
                <a href="/Journal">Journal</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-start-7 md:col-span-2 lg:col-start-9 lg:col-span-2 flex flex-col items-center justify-center mb-5 mt-5">
          <p className="font-bold text-dark-light text-center mb-2">
            Follow Us
          </p>
          <div className="flex items-center space-x-4 text-gray-300">
            <AiOutlineTwitter className="w-6 h-auto" />
            <AiFillYoutube className="w-6 h-auto" />
            <AiFillInstagram className="w-6 h-auto" />
            <FaFacebook className="w-6 h-auto" />
            <BsTelegram className="w-6 h-auto" />
          </div>
        </div>

        <div className="md:col-span-12 lg:col-span-10 flex justify-center items-center flex-col">
          <p className="font-bold text-dark-light text-center mt-4">
            Copyright © 2024. All rights reserved
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

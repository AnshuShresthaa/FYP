import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";


import { images } from "../constants";
import { logout } from "../store/actions/user";

const navItemsInfo = [
  { name: "Home", type: "link", url: "/" },
  { name: "Blog", type: "link", url: "/Blog" },
  { name: "Mood Tracker", type: "link", url: "/MoodTracker" },
  { name: "Journal", type: "link", url: "/Journal" },
];

const NavItem = ({ item }) => {
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <a href={item.url} className="px-4 py-2 transition-colors duration-300 hover:text-blue-500">
            {item.name}
          </a>
          <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
          </span>
        </>
      ) : (
        <>
          <a href="/" className="px-4 py-2 flex gap-x-1 items-center transition-colors duration-300 hover:text-blue-500">
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </a>
          <div className="hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max">
            <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <a
                  key={index}
                  href="/"
                  className="hover:text-blue-500 px-4 py-2 text-white lg:text-dark-soft"
                >
                  {page}
                </a>
              ))}
            </ul>
          </div>
        </>
      )}
    </li>
  );
};


const Header = () => {
  const navigate = useNavigate();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section>
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
      <Link to="/">
        <img src=
          {images.Logo} 
          alt="logo" 
          style={{ width: '150px', height: 'auto' }} />
        </Link>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            <div className="relative group">
              <div className="flex flex-col items-center">
                <button
                  className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                  onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                >
                  <span>Account</span>
                  <MdKeyboardArrowDown />
                </button>
                <div
                  className={`${
                    profileDrowpdown ? "block" : "hidden"
                  } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                >
                  <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                    {userState?.userInfo?.admin && (
                      <button
                        onClick={() => navigate("/admin")}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Admin Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => navigate("/profile")}
                      type="button"
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Profile Page
                    </button>
                    <button
                      onClick={logoutHandler}
                      type="button"
                      className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          ): ( 
            <button 
              onClick={() => navigate("/register")}
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
                Sign in
            </button> 
          )}
          
        </div>
      </header>
    </section>
  );
};
export default Header;
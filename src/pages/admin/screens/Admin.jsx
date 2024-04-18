import React, { useEffect, useState } from "react";
import { getAllUsers, getTotalUsers } from "../../../services/index/users";
import { getAllPosts } from "../../../services/index/posts";
import { getAllComments } from "../../../services/index/comments";
import { HiOutlineUser, HiDocumentText, HiChatAlt2 } from 'react-icons/hi';
import { useSelector } from "react-redux";

import Users from "./AdminDashboard/Users";
import { Link } from "react-router-dom";
import ManagePosts from "./AdminDashboard/ManagePost";
import Comments from "./AdminDashboard/comments";

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
       console.log(useState)
        const response = await getAllUsers(userState.userInfo.token);
        
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    const fetchTotalPosts = async () => {
      try {
        const response = await getAllPosts();
        setTotalPosts(response.data.length);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    };

    const fetchTotalComments = async () => {
      try {
        const response = await getAllComments(userState.userInfo.token);
        console.log("Response from getAllComments:", response);
        setTotalComments(response.data.length);
      } catch (error) {
        console.error("Error fetching total comments:", error);
      }
    };
    

    const fetchRecentUsers = async () => {
      try {
        const response = await getAllUsers(null, "", 1, 5); // Fetching 5 recent users
        setRecentUsers(response.data);
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const response = await getAllPosts("", 1, 5); // Fetching 5 recent posts
        setRecentPosts(response.data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    const fetchRecentComments = async () => {
      try {
        const response = await getAllComments(null, "", 1, 5); // Fetching 5 recent comments
        setRecentComments(response.data);
      } catch (error) {
        console.error("Error fetching recent comments:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalPosts();
    fetchTotalComments();
    fetchRecentUsers();
    fetchRecentPosts();
    fetchRecentComments();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Total counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-gray-100 rounded-md shadow-md p-4 flex items-center">
          <div className="bg-purple-500 rounded-full p-3">
            <HiOutlineUser className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </div>
        {/* Total Posts */}
        <div className="bg-gray-100 rounded-md shadow-md p-4 flex items-center">
          <div className="bg-green-500 rounded-full p-3">
            <HiDocumentText className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Posts</h3>
            <p className="text-xl font-bold">{totalPosts}</p>
          </div>
        </div>
        {/* Total Comments */}
        <div className="bg-gray-100 rounded-md shadow-md p-4 flex items-center">
          <div className="bg-blue-400 rounded-full p-3">
            <HiChatAlt2 className="text-white" size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Comments</h3>
            <p className="text-xl font-bold">{totalComments}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Users and Comments */}
      <div className="flex mt-8"> {/* Add gap-4 to create space between flex items */}
      {/* Recent Users */}
      <div className="w-1/2 flex flex-col items-center">
        <h3 className="text-lg font-semibold">Recent Users</h3>
        <div className="mt-4">
          <Link
            to="/admin/users/manage"
            className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            See all
          </Link>
        </div>
        <Users className="w-screen" />
      </div>

      {/* Recent Comments */}
      <div className="w-1/2 flex flex-col items-center">
        <h3 className="text-lg font-semibold">Recent Comments</h3>
          <div className="mt-4"></div>
          <Link
            to="/admin/comments"
            className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            See all
          </Link>
          <Comments />
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">Recent Posts</h3>
        <div className="mt-4">
          <Link
            to="/admin/posts/manage"
            className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            See all
          </Link>
        </div>
        {/* Render recent posts data */}
        <ManagePosts />
      </div>
    </div>
  );
};

export default Admin;

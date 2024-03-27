import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return (
    <section className='container mx-auto mt-16 p-4 md:px-16'>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Make Your Mental Health a Priority</h2>
        <p className="text-black text-lg lg:text-xl">
          The most important findings from the latest research, all in one place.
        </p>
      </div>
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
          data?.data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        )}
      </div>
      <Link
        to="/allBlog"
        className="flex items-center justify-center font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg max-w-sm mx-auto"
        >
        <span className="mr-2">More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </Link>
    </section>
  );
};

export default Articles;

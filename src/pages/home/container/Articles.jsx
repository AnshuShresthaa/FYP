import React from 'react';
import { FaArrowRight } from "react-icons/fa";

import ArticleCard from '../../../components/ArticleCard';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../../services/index/posts';
import toast from 'react-hot-toast';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import ErrorMessage from '../../../components/ErrorMessage';


const Articles = () => {
const { data, isLoading, isError } = useQuery({
  queryFn: () => getAllPosts(),
  queryKey: ["posts"],
  throwOnError: (error) => {
    toast.error(error.message);
    console.log(error);
  },
});

  return (
    <section className='container mx-auto mt-8 p-4'>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Make Your Mental Health a Priority</h2>
        <p className="text-black text-lg lg:text-xl">
          The most important findings from the latest research, all in one place.
        </p>
      </div>
      <div className='flex flex-wrap justify-center gap-y-8'>
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton 
              key={index} 
              className="w-full md:w-[calc(33.33%-32px)] lg:w-[calc(25%-32px)] mb-8 mr-4" 
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) :  (
        data.map((post) => (
          <ArticleCard 
            key= {post._id} 
            post={post}
            className='w-full md:w-[calc(33.33%-32px)] lg:w-[calc(25%-32px)] mb-8 mr-4' 
          />
        ))
      )} 
        
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;

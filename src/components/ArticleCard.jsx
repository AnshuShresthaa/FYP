import React from 'react'

import { images, stables } from '../constants';
import { Link } from 'react-router-dom';

const ArticleCard = ({ post, className }) => {
  return (
    <div
      className={`overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
        <Link to={`/blog/${post.slug}`}>
        <img 
            src={
              post.photo 
                ? stables.UPLOAD_FOLDER_BASE_URL + post.photo 
                : images.Blog1Image
            } 
            alt='title' 
            className='w-full object-cover object-center h-40 md:h-52 lg:h-48 xl:h-56'
        />
        </Link>

        <div className='p-5'>
        <Link to={`/blog/${post.slug}`}>
          <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[20px]'>
              {post.title}
          </h2>
          <p className='text-dark-light mt-3 text-sm md:text-base'>
              {post.caption}
          </p>
        </ Link> 
        </div>
    </div>
  );
};

export default ArticleCard;
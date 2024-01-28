import React from 'react'

import { images } from '../constants';

const ArticleCard = ({ className }) => {
  return (
    <div
      className={`overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
        <img 
            src={images.post1Image} 
            alt='title' 
            className='w-full object-cover object-center h-40 md:h-52 lg:h-48 xl:h-56'
        />

        <div className='p-5'>
            <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[20px]'>
                Understanding Depression: Unraveling the Complex Web of Mental Health
            </h2>
            <p className='text-dark-light mt-3 text-sm md:text-base'>
                Depression, often referred to as the silent struggle, is a complex and pervasive mental health condition that affects millions worldwide. 
            </p>
            
        </div>
    </div>
  );
};

export default ArticleCard;
import React from 'react';
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from '../../components/MainLayout';
import { images } from "../../constants";
import { Link } from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentsContainer from '../../components/comments/CommentsContainer';

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "BlogPage", link: "/Blog" },
  { name: "Blog title", link: "/blog/1" },
];

const postsData = [
    {
        _id: "1",
        image: images.Blog1Image,
        title: "Depression",
        createdAt: "2023-01-28T15:35:53.607+0000"
    },
    {
        _id: "2",
        image: images.Blog1Image,
        title: "Depression",
        createdAt: "2023-01-28T15:35:53.607+0000"
    },
    {
        _id: "3",
        image: images.Blog1Image,
        title: "Depression",
        createdAt: "2023-01-28T15:35:53.607+0000"
    },
    {
        _id: "4",
        image: images.Blog1Image,
        title: "Depression",
        createdAt: "2023-01-28T15:35:53.607+0000"
    },
];

const tagsData = ["Depression", "Anxiety", "OCD", "Anger", "Panic Attack"];

const BlogPage = () => {
  return (
    <MainLayout>
      <section className='container mx-auto max-w-5xl grid lg:grid-cols-2 gap-8 items-start'>
        <article>
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className='rounded-xl w-full lg:w-full lg:h-auto'
            src={images.Blog1Image}
            alt="mental-health"
          />
          <Link to='/Blog?category=selectedCategory' className="text-primary text-sm font-roboto inline-block mt-4 md:text-base">
            Depression
          </Link>
          <h1 className='text-3xl lg:text-4xl font-medium font-roboto mt-4 text-dark-hard'>
            Help yourself
          </h1>
          <div className='mt-4 text-dark-soft text-lg'>
            <p className='leading-7'>
              Looking after our physical health means seeing a doctor if we don’t feel well. 
              Likewise, we don’t have to wait till we’re overwhelmed to take care of our mental health. 
              Explore the resources below to help feel your best.
            </p>
          </div>
          <CommentsContainer className="mt-10" logginedUserId="a" />
        </article>
        <SuggestedPosts
          header="Latest Posts"
          posts={postsData}
          tags={tagsData}
          className="lg:mt-0"
        />
      </section>
    </MainLayout>
  );
};

export default BlogPage;

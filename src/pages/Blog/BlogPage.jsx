import React, { useState } from 'react';
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from '../../components/MainLayout';
import { images,stables } from "../../constants";
import { Link, useParams } from 'react-router-dom';
import { generateHTML } from '@tiptap/react';
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";


import SuggestedPosts from './container/SuggestedPosts';
import CommentsContainer from '../../components/comments/CommentsContainer';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getSinglePost } from '../../services/index/posts';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';


const BlogPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
          { name: "Home", link: "/" },
          { name: "BlogPage", link: "/Blog" },
          { name: "Blog title", link: `/blog/${slug}` },
      ]);
      setBody( 
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document]))
      );
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
  });

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ): isError ? ( 
        <ErrorMessage message="Couldnt fetch the post details" /> 
      ) : (
        <section className='container mx-auto max-w-5xl grid lg:grid-cols-2 gap-8 items-start'>
          <article>
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className='rounded-xl w-full lg:w-full lg:h-auto'
              src={data?.photo ? stables.UPLOAD_FOLDER_BASED_URL + data?.photo : images.Blog1Image}
              alt={data?.title}
            />
            <div className='mt-4 flex gap-2'>
              {data?.categories.map((category) => (
                <Link 
                  to={`/Blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                  >
                    {category.name}
                </Link>
              ))} 
            </div> 
            <h1 className='text-3xl lg:text-4xl font-medium font-roboto mt-4 text-dark-hard'>
              {data?.title}
            </h1>
            <div className='mt-4 prose prose-sm:prose-base'>
              {body}
            </div>
            <CommentsContainer 
              comments={data?.comments}
              className="mt-10" 
              logginedUserId={userState?.userInfo?._id} 
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Posts"
              posts={postsData}
              tags={data?.tags}
              className="lg:mt-0"
            />
         </div>
      </section>
      )} 
    </MainLayout>
  );
};

export default BlogPage;

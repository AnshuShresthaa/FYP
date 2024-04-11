import React, { useEffect, useState } from 'react';
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from '../../components/MainLayout';
import { images, stables } from "../../constants";
import { Link, useParams } from 'react-router-dom';
import SuggestedPosts from './container/SuggestedPosts';
import CommentsContainer from '../../components/comments/CommentsContainer';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getSinglePost } from '../../services/index/posts';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';
import parseJsonToHtml from '../../utils/parseJsonToHtml';
import Editor from '../../components/editor/Editor';

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
      setBody(parseJsonToHtml(data?.body));
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ): isError ? ( 
        <ErrorMessage message="Couldnt fetch the post details" /> 
      ) : (
        <section className='container mx-auto max-w-5xl grid lg:grid-cols-3 gap-8 items-start'>
          <article className="lg:col-span-2"> 
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className='rounded-xl w-full lg:w-full lg:h-auto'
              src={
                data?.photo 
                ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo 
                : images.Blog1Image
              }
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
              posts={postsData?.data}
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

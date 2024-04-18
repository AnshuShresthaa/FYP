import React, { useState } from "react";
import { images, stables } from "../../../../constants";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import Pagination from "../../../../components/Pagination";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";
import ConfirmationModal from "../../../../utils/ConfirmationModal"; // Import the ConfirmationModal component

const ManagePosts = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: postsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteConfirmation = (post) => {
    setPostToDelete(post);
    setShowConfirmationModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deleteDataHandler({
        slug: postToDelete.slug,
        token: userState.userInfo.token,
      });
      setShowConfirmationModal(false);
    }
  };

  return (
    <>
      <DataTable
        pageTitle="Manage Posts"
        dataListName="Posts"
        searchInputPlaceHolder="Search for posts..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={["Title", "Category", "Created At", "Tags", ""]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={postsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={postsData?.headers}
        userState={userState}
      >
        {postsData?.data.map((post) => (
          <tr key={post.slug}>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="/" className="relative block">
                    <img
                      src={
                        post?.photo
                          ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                          : images.samplePostImage
                      }
                      alt={post.title}
                      className="mx-auto object-cover rounded-lg w-10 aspect-square"
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {post.categories.length > 0
                  ? post.categories
                      .slice(0, 3)
                      .map(
                        (category, index) =>
                          `${category.title}${
                            post.categories.slice(0, 3).length === index + 1
                              ? ""
                              : ", "
                          }`
                      )
                  : "Uncategorized"}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex gap-x-2">
                {post.tags.length > 0
                  ? post.tags.map((tag, index) => (
                      <p key={index}>
                        {tag}
                        {post.tags.length - 1 !== index && ","}
                      </p>
                    ))
                  : "No tags"}
              </div>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
              <button
                disabled={isLoadingDeleteData}
                type="button"
                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => handleDeleteConfirmation(post)}
              >
                Delete
              </button>
              <Link
                to={`/admin/posts/manage/edit/${post.slug}`}
                className="text-green-600 hover:text-green-900"
              >
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this post?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default ManagePosts;

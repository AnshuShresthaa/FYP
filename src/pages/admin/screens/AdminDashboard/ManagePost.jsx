import React from "react";
import { images, stables } from "../../../../constants";
import { getAllPosts } from "../../../../services/index/posts";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";

const ManagePosts = () => {
  const {
    currentPage,
    data: postsData,
    isLoading,
    isFetching,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllPosts("", currentPage, 5), // Fetching 5 posts per page
    dataQueryKey: "posts",
  });

  return (
    <>
      <DataTable
        tableHeaderTitleList={["Title", "Category", "Tags"]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={postsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={postsData?.headers}
        showSearchBar={false} // Set search bar to false
        showPagination={false} // Remove pagination component
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
          </tr>
        ))}
      </DataTable>
    </>
  );
};

export default ManagePosts;

import React from "react";
import { useDataTable } from "../../../../hooks/useDataTable";
import { getAllComments } from "../../../../services/index/comments";
import DataTable from "../../components/DataTable";

const Comments = () => {
  const {
    userState,
    currentPage,
    data: commentsData,
    isLoading,
    isFetching,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, "", currentPage, 5),
    dataQueryKey: "comments",
  });

  return (
    <>
      <DataTable
        tableHeaderTitleList={["Comment", "Created At"]}
        isFetching={isFetching}
        isLoading={isLoading}
        data={commentsData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={commentsData?.headers}
        showSearchBar={false} // Set showSearchBar to false to hide the search bar
        showPagination={false} // Remove pagination component
      >
        {commentsData?.data.map((comment) => (
          <tr key={comment._id}>
            <td className="px-10 py-10 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {comment?.desc}
              </p>
            </td>
            <td className="px-10 py-10 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </td>
          </tr>
        ))}
      </DataTable>
    </>
  );
};

export default Comments;

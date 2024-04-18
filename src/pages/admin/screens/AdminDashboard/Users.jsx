import React from "react";
import { useDataTable } from "../../../../hooks/useDataTable";
import { getAllUsers } from "../../../../services/index/users";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";

const Users = () => {
  const {
    userState,
    currentPage,
    data: usersData,
    isLoading,
    isFetching,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllUsers(userState.userInfo.token),
    dataQueryKey: "users",
  });

  return (
    <DataTable
      tableHeaderTitleList={["Name", "Email"]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
      showSearchBar={false}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={user?.avatar ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar : images.userImage}
                    alt={user.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
              </div>
            </div>
          </td>
          <td className="px-12 py-12 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;

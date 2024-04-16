import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from "../../../../services/index/users";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";
import ConfirmationModal from "../../../../utils/ConfirmationModal";

const Users = () => {
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [showAdminConfirmationModal, setShowAdminConfirmationModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [adminUserId, setAdminUserId] = useState("");
  
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    isLoadingUpdateAdmin,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });

  const { mutate: mutateUpdateUser } = useMutation({
    mutationFn: ({ isAdmin, userId }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { admin: isAdmin },
        userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User status is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const openDeleteConfirmationModal = (userId) => {
    setShowDeleteConfirmationModal(true);
    setDeleteUserId(userId);
  };

  const closeDeleteConfirmationModal = () => {
    setShowDeleteConfirmationModal(false);
    setDeleteUserId("");
  };

  const handleConfirmDeleteUser = () => {
    deleteDataHandler({
      slug: deleteUserId,
      token: userState.userInfo.token,
    });
    closeDeleteConfirmationModal();
  };

  const openAdminConfirmationModal = (userId) => {
    setShowAdminConfirmationModal(true);
    setAdminUserId(userId);
  };

  const closeAdminConfirmationModal = () => {
    setShowAdminConfirmationModal(false);
    setAdminUserId("");
  };

  const handleConfirmAdminStatusChange = (isAdmin) => {
    mutateUpdateUser({ isAdmin, userId: adminUserId });
    closeAdminConfirmationModal();
  };

  return (
    <>
      <DataTable
        pageTitle="Manage Users"
        dataListName="Users"
        searchInputPlaceHolder="User's email..."
        searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
        searchKeywordOnChangeHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
        tableHeaderTitleList={["Name", "Email", "Created At", "is Admin", ""]}
        isLoading={isLoading}
        isFetching={isFetching}
        data={usersData?.data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        headers={usersData?.headers}
        userState={userState}
      >
        {usersData?.data.map((user) => (
          <tr key={user._id}>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="/" className="relative block">
                    <img
                      src={
                        user?.avatar
                          ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                          : images.userImage
                      }
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
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <p className="text-gray-900 whitespace-no-wrap">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
              <input
                type="checkbox"
                className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('../public/images/check.png')] bg-cover checked:disabled:bg-none"
                defaultChecked={user.admin}
                onChange={() => openAdminConfirmationModal(user._id)}
                disabled={isLoadingUpdateAdmin}
              />
            </td>
            <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
              <button
                disabled={isLoadingDeleteData}
                type="button"
                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => openDeleteConfirmationModal(user._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
      {showDeleteConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDeleteUser}
          onCancel={closeDeleteConfirmationModal}
        />
      )}
      {showAdminConfirmationModal && (
        <ConfirmationModal
          message="Do you want to change the admin status of this user?"
          onConfirm={() => handleConfirmAdminStatusChange(true)}
          onCancel={() => handleConfirmAdminStatusChange(false)}
        />
      )}
    </>
  );
};

export default Users;

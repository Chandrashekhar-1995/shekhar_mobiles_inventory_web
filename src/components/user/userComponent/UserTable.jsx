import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchUsers from "../../../hooks/useFetchUsers";
import { deleteUser } from "../../../../service/userApi";
import { removeAllUser } from "../../../store/allUserSlice";

const UserTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useFetchUsers();
    const users = useSelector((state) => state.allUsers.allUsers);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteUser(userToDelete._id);
            if (data.success) {
                toast.success(data.message);
                // dispatch(removeAllUser(userToDelete._id)); // Update Redux store
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting customer. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

  return (
    <div className="overflow-x-auto">

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirm Delete
                        </h3>
                        <p className="mb-6">
                            Are you sure you want to delete Staff{" "}
                            <span className="font-bold">{userToDelete?.name}</span>?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">S.No.</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Mobile No.</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Balance</th>
                    <th className="px-4 py-2">Edit</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((user, index) => (
                <tr 
                    key={user._id} 
                    className="odd:bg-white even:bg-gray-100"
                >
                    <td className="border px-4 text-black py-2">{index + 1}</td>
                    <td className="border px-4 text-black py-2">{user.name}</td>
                    <td className="border px-4 text-black py-2">{user.mobileNumber}</td>
                    <td className="border px-4 text-black py-2">{user.address}</td>
                    <td className="border px-4 text-black py-2">{user.balance}</td>
                    <td className="border px-4 text-black py-2">
                            <Link 
                                to={`/user/profile/${user._id}`} 
                                className="text-blue-500 hover:underline"
                            >
                                View/Edit
                            </Link>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDeleteClick(user)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserTable;
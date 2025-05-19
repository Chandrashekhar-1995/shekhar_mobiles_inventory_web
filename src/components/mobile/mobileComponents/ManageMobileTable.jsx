import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchMobiles from "../../../hooks/useFetchMobiles";
import { deleteMobile } from "../../../../service/mobileApi";
import { toast } from "react-toastify";

const ManageMobileTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [mobileToDelete, setMobileToDelete] = useState(null);


    useFetchMobiles();
    const mobiles = useSelector((store) => store.mobiles.allMobiles)
    console.log("mobles", mobiles);
    

    const handleDeleteClick = (m) => {
        setMobileToDelete(m);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteMobile(mobileToDelete._id);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting mobile. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setMobileToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setMobileToDelete(null);
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
                            Are you sure you want to delete Mobile{" "}
                            <span className="font-bold">{mobileToDelete?.mobileName}</span>?
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
                        <th className="px-4 py-2">Mobile Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mobiles && mobiles.map((m, index) => (
                        <tr key={m._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={m.length} className="border px-4 text-black py-2">{index + 1}</td>
                            <td rowSpan={m.length} className="border px-4 py-2">
                                <Link to={`/account/update/${m._id}`} className="text-blue-500 hover:underline">
                                    {m.mobileName}
                                </Link>
                            </td>
                            <td rowSpan={m.length} className="border px-4 py-2">
                                <Link to={`/account/update/${m._id}`} className="text-blue-500 hover:underline">
                                    {m.mobileType}
                                </Link>
                            </td>
                            <td rowSpan={m.length} className="border px-4 text-black py-2">
                                {m.stockQuantity}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDeleteClick(m)}
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
    );
}

export default ManageMobileTable;
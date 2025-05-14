import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchBrands from "../../hooks/useFetchBrands";

import { deleteBrand } from "../../../service/brandApi";
import { toast } from "react-toastify";

const ManageBrandTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState(null);

    useFetchBrands();
    const brands = useSelector((store) => store.brands.allBrands);

    const handleDeleteClick = (b) => {
        setBrandToDelete(b);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteBrand(brandToDelete._id);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting brand. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setBrandToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setBrandToDelete(null);
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
                            Are you sure you want to delete Brand{" "}
                            <span className="font-bold">{brandToDelete?.brandName}</span>?
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
                        <th className="px-4 py-2">Brand Name</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands && brands.map((b, index) => (
                        <tr key={b._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={b.length} className="border px-4 py-2">{index + 1}</td>
                            <td rowSpan={b.length} className="border px-4 py-2">
                                <Link to={`/brand/update/${b._id}`} className="text-blue-500 hover:underline">
                                    {b.brandName}
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDeleteClick(b)}
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

export default ManageBrandTable;

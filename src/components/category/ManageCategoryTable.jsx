import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchCategories from "../../hooks/useFetchCategories";
import { deleteCategory, deleteSubCategory } from "../../../service/categoryApi";
import { toast } from "react-toastify";

const ManageCategoryTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

    useFetchCategories();
    const categories = useSelector((store) => store.categories.allCategories);

    const handleDeleteClick = (c) => {
        setCategoryToDelete(c);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteCategory(categoryToDelete._id);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting category. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
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
                            Are you sure you want to delete Category{" "}
                            <span className="font-bold">{categoryToDelete?.categoryName}</span>?
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
                        <th className="px-4 py-2">Category Name</th>
                        <th className="px-4 py-2">GST Rate</th>
                        <th className="px-4 py-2">Sub Categories</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category, index) => {
                        const subCategories = category.subCategories || [];
                        const rowSpan = Math.max(1, subCategories.length);
                        
                        return (
                            <React.Fragment key={category._id}>
                                <tr className="odd:bg-white even:bg-gray-100">
                                    <td rowSpan={rowSpan} className="border px-4 py-2 text-black text-center">
                                        {index + 1}
                                    </td>
                                    <td rowSpan={rowSpan} className="border px-4 py-2">
                                        <Link to={`/category/update/${category._id}`} className="text-blue-500 hover:underline">
                                            {category.categoryName}
                                        </Link>
                                    </td>
                                    <td rowSpan={rowSpan} className="border px-4 py-2 text-black text-center">
                                        {category.gstRate}%
                                    </td>
                                    {subCategories.length > 0 ? (
                                        <td className="border px-4 py-2">
                                            {subCategories[0]}
                                        </td>
                                    ) : (
                                        <td className="border px-4 py-2 text-black">-</td>
                                    )}
                                    <td rowSpan={rowSpan} className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeleteClick(category)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {subCategories.slice(1).map((subCategory, subIndex) => (
                                    <tr key={`${category._id}-${subIndex}`} className="odd:bg-white even:bg-gray-100">
                                        <td className="border px-4 py-2">{subCategory}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManageCategoryTable;
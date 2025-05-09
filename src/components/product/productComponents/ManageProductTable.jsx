import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchProducts from "../../../hooks/useFetchProducts";
import { deleteProduct } from "../../../../service/productApi";
import { toast } from "react-toastify";

const ManageProductTable = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const handleDeleteClick = (p) => {
        setProductToDelete(p);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteProduct(productToDelete._id);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error deleting product. Please try again.");
        } finally {
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    useFetchProducts();
    const products = useSelector((store) => store.products.allProducts);
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
                            Are you sure you want to delete Ptoduct{" "}
                            <span className="font-bold">{productToDelete?.productName}</span>?
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
                        <th className="px-4 py-2">Item Code</th>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Purchase Price</th>
                        <th className="px-4 py-2">Sale Price</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((p, index) => (
                        <tr key={p._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={p.length} className="border px-4 py-2">{index + 1}</td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                <Link to={`/account/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.itemCode}
                                </Link>
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                <Link to={`/account/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.productName}
                                </Link>
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.stockQuantity}
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.purchasePrice}
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {p.salePrice}
                            </td>
                            <td className="border px-4 py-2">
                            <button
                                onClick={() => handleDeleteClick(p)}
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

export default ManageProductTable;

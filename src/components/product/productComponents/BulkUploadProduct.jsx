import React, { useState } from "react";
import { toast } from "react-toastify";
import { CloudArrowDownIcon, CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

const BulkUploadProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProducts, setUploadProducts] = useState([]);
    const [skippedProducts, setSkippedProducts] = useState([]);

    const handleClose = () => {
        setShowModal(false);
        setFile(null);
        setUploadCustomers([]);
        setSkippedCustomers([]);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        document.querySelector('input[type="file"]').value = '';
    };

    const handleDownloadTemplate = () => {
        const templateUrl = "http://localhost:7777/api/v1/product/bulk-upload/template";
        const link = document.createElement("a");
        link.href = templateUrl;
        link.setAttribute("download", "product-template.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please select a file before uploading!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:7777/api/v1/product/bulk-upload", {
                method: "POST",
                body: formData,
                credentials: "include" 
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.message}`);
            }
            
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setUploadProducts(data.data.insertedProducts || []);
                setSkippedProducts(data.data.skippedProducts || []); 
                setFile(null); 
            } else {
                toast.error(data.message || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(error.message || "Error uploading file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-4">
            <button
                className="btn btn-sm btn-primary"
                onClick={() => setShowModal(true)}
            >
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                Bulk Upload Products
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center space-y-4 relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>

                        <h2 className="font-semibold text-xl">Bulk Upload Products</h2>
                        <p className="text-sm text-gray-600">
                            Download the template, fill in product details, and upload it here.
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button
                                className="btn btn-sm btn-outline-primary flex items-center"
                                onClick={handleDownloadTemplate}
                                disabled={loading}
                            >
                                <CloudArrowDownIcon className="h-5 w-5 mr-2" />
                                Download Template
                            </button>

                            <label className="btn btn-sm btn-secondary flex items-center">
                                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                                {file ? file.name : "Select File"}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".xlsx, .csv"
                                    disabled={loading}
                                />
                            </label>
                        </div>

                        {file && (
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                    <span className="text-sm truncate">{file.name}</span>
                                    <button 
                                        onClick={handleRemoveFile}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={loading}
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                
                                <button
                                    className="btn btn-primary w-full flex items-center justify-center"
                                    onClick={handleUpload}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <>
                                            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                                            Upload Products
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {uploadProducts.length > 0 && (
                            <div className="text-left mt-4">
                                <h3 className="font-semibold text-md text-green-600 flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    Successfully Uploaded ({uploadProducts.length})
                                </h3>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {uploadProducts.map((product, index) => (
                                        <li key={index}>{product.productName + " - "+ product.itemCode || 'Product ' + (index + 1)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {skippedProducts.length > 0 && (
                            <div className="text-left mt-4">
                                <h3 className="font-semibold text-md text-orange-500 flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                    Skipped Products ({skippedProducts.length})
                                </h3>
                                <p className="text-sm text-gray-700">
                                    The following products were skipped due to errors in the file:
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {skippedProducts.map((product, index) => (
                                        <li key={index}>{product.row.productName + " - "+ product.row.itemCode || 'Product ' + (index + 1)} - {product.reason || 'Reason not provided'}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkUploadProduct;
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CloudArrowDownIcon, CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

const BulkUploadCustomer = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadCustomers, setUploadCustomers] = useState([]);
    const [skippedCustomers, setSkippedCustomers] = useState([]);

    const handleClose = () => {
        setShowModal(false);
        setFile(null); // Reset file when closing modal
        setUploadCustomers([]); // Clear previous results
        setSkippedCustomers([]);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        // Reset the file input value so the same file can be selected again
        document.querySelector('input[type="file"]').value = '';
    };

    const handleDownloadTemplate = () => {
        const templateUrl = "http://localhost:7777/api/v1/customer/bulk-upload/template";
        const link = document.createElement("a");
        link.href = templateUrl;
        link.setAttribute("download", "customer-template.xlsx");
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
            const response = await fetch("http://localhost:7777/api/v1/customer/bulk-upload", {
                method: "POST",
                body: formData,
                credentials: "include" 
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                setUploadCustomers(data.data.insertedCustomers || []);
                setSkippedCustomers(data.data.skippedCustomers || []); 
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
                Bulk Upload Customer
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

                        <h2 className="font-semibold text-xl">Bulk Upload Customers</h2>
                        <p className="text-sm text-gray-600">
                            Download the template, fill in customer details, and upload it here.
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
                                            Upload Customers
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        {uploadCustomers.length > 0 && (
                            <div className="text-left mt-4">
                                <h3 className="font-semibold text-md text-green-600 flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                                    Successfully Uploaded ({uploadCustomers.length})
                                </h3>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {uploadCustomers.map((customer, index) => (
                                        <li key={index}>{customer.name + " - "+ customer.mobileNumber || 'Customer ' + (index + 1)}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {skippedCustomers.length > 0 && (
                            <div className="text-left mt-4">
                                <h3 className="font-semibold text-md text-orange-500 flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                    Skipped Customers ({skippedCustomers.length})
                                </h3>
                                <p className="text-sm text-gray-700">
                                    The following customers were skipped due to errors in the file:
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {skippedCustomers.map((customer, index) => (
                                        <li key={index}>{customer.row.name + " - "+ customer.row.mobileNumber || 'Customer ' + (index + 1)} - {customer.reason || 'Reason not provided'}</li>
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

export default BulkUploadCustomer;
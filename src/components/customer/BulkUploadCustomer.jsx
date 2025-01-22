import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

const BulkUploadCustomer = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCustomers, setUploadCustomers] = useState([]);
  const [skippeCustomers, setSkippedCustomers] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/customer/bulk-upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Save the response arrays to state and ensure immediate UI update
      setUploadCustomers(response.data.data.insertedCustomers || []);
      setSkippedCustomers(response.data.data.skippedCustomers || []);

      alert("File uploaded successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateUrl = "http://localhost:7777/api/v1/customer/bulk-upload/template";
    const link = document.createElement("a");
    link.href = templateUrl;
    link.setAttribute("download", "product-template.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <Typography variant="h5" className="text-center pb-10 font-bold">
          Product Bulk Upload
        </Typography>

        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full h-12 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 mb-4"
          >
            <UploadFileIcon className="mr-2 text-blue-500" />
            <span className="text-sm text-gray-600">Select Excel File</span>
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="text-sm text-gray-700 mb-4">
              Selected File: <strong>{file.name}</strong>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mb-4"
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload File"
            )}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadTemplate}
            className="w-full"
          >
            Download Template
          </Button>
        </div>

        {/* Display Upload Results */}
        {uploadCustomers.map((result, index) => (
          <li key={index} className="mb-4">
            <div className="flex flex-col bg-white shadow p-4 rounded">
              <Typography variant="body1" className="font-semibold">
                Product Name: {result ? JSON.stringify(result.name) : "Unknown"}
              </Typography>
              <Typography variant="body2" className="text-green-600">
                Status: Inserted
              </Typography>
            </div>
          </li>
        ))}

        {skippeCustomers.map((result, index) => (
          <li key={index} className="mb-4">
            <div className="flex flex-col bg-white shadow p-4 rounded">
              <Typography variant="body1" className="font-semibold">
                Product Name: {result.row?.name ? JSON.stringify(result.row.name) : "Unknown"}                
              </Typography>
              {console.log(result)}
              <Typography variant="body2" className="text-red-600">
                Reason: {result.reason || "No reason provided"}
              </Typography>
            </div>
          </li>
        ))}

      </div>
    </div>
  );
};

export default BulkUploadCustomer;

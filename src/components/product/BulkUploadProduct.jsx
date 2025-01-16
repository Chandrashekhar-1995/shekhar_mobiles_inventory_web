import React, { useState } from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";

const ProductBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      const response = await axios.post("http://localhost:7777/api/v1/product/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const templateUrl = "http://localhost:7777/api/v1/product/template"; 
    const link = document.createElement("a");
    link.href = templateUrl;
    link.setAttribute("download", "product-template.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <Typography variant="h5" className="text-center mb-4 font-bold">
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
      </div>
    </div>
  );
};

export default ProductBulkUpload;

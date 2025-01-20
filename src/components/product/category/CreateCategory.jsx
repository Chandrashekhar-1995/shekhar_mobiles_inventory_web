import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    categoryName : "",
    subcategories:"",
  });
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/category/create",
        formData,
        {
          withCredentials:true
        }
      );
      setSuccessMessage("Category created successfully !");
      navigate(-1);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-100 rounded-lg shadow-lg w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Category Information</h2>
          <button onClick={goBack} className="hover:bg-red-600 rounded-lg p-2"> X </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
            {errorMessage && (
                <Alert severity="error" className="mb-4">
                    {errorMessage}
                </Alert>
            )}
            {successMessage && (
                <Alert severity="success" className="mb-4">
                    {successMessage}
                </Alert>
            )}
           
            <div className="border border-gray-300 col-span-5 relative">
                {/* category Name */}
                <div className="grid grid-cols-4 gap-2 m-2 mt-7">
                  <label className="col-span-1 text-xs font-medium p-2">Category Name *</label>
                  <input type="text" name="categoryName" placeholder="Category Name" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.categoryName} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-4 gap-2 m-2 mt-7">
                  <label className="col-span-1 text-xs font-medium p-2">Sub Category</label>
                  <input type="text" name="subcategories" placeholder="Sub Category" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.subcategories} onChange={handleChange} />
                  
                </div>

                <div className=" m-2 mt-7">
                <button type="submit" className=" w-full bg-blue-500 text-white rounded mx-4 m-2 p-2">
                      Create
                    </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
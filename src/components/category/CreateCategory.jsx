import React, { useState } from "react";
import { toast } from "react-toastify";
import { createNewCategory } from "../../../service/categoryApi";

const CreateCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    gstRate: "",
    subCategory: "", 
    subCategories: [], 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSubCategory = () => {
    if (formData.subCategory.trim() === "") return;
    if (formData.subCategories.includes(formData.subCategory.trim())) {
      toast.warning("Sub Category already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subCategories: [...prev.subCategories, prev.subCategory.trim()],
      subCategory: "",
    }));
  };

  const removesubCategory = (index) => {
    const updated = [...formData.subCategories];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, subCategories: updated }));
  };

  const resetForm = () => {
    setFormData({
      categoryName: "",
      gstRate: "",
      subCategory: "", 
      subCategories: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryName) {
      toast.error("Please fill Category name");
      return;
    }

    try {
      const data = await createNewCategory(formData);

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Category
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create New Category</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* categoryName */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">Category Name</span>
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    className="input input-bordered input-sm text-xs"
                    placeholder="e.g., Data Cable"
                  />
                </div>

                {/* gstRate */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">GST</span>
                  </label>
                  <input
                    type="number"
                    name="gstRate"
                    value={formData.gstRate}
                    onChange={handleChange}
                    className="input input-bordered input-sm text-xs"
                    placeholder="e.g., 18"
                  />
                </div>

                {/* Sub Category Input with Add Button */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">Sub Category</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="input input-bordered input-sm text-xs flex-1"
                      placeholder="e.g., Type-C"
                    />
                    <button
                      type="button"
                      onClick={addSubCategory}
                      className="btn btn-sm btn-success"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Show Sub Categories */}
              {formData.subCategories.length > 0 && (
                <div>
                  <label className="label">
                    <span className="label-text text-xs">Added Sub Categories</span>
                  </label>
                  <ul className="flex flex-wrap gap-2">
                    {formData.subCategories.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 text-xs px-2 py-1 rounded flex items-center gap-1"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removesubCategory(index)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;